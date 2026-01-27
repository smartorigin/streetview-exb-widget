const fs = require('fs')
const { execSync } = require('child_process')

const usage = 'usage -> node package.js <widget-name> <exb-path> <dist-location>'
//where build will be stored before release
const tempFolder = './tmp'
//root folder found in zip
const rootZip = `widget`
const releaseTemp = `${tempFolder}`
//part of widget info that must be added to client folder
const widgetInfoRef = `${releaseTemp}/to-copy-in-widgets-info.json`

/**
 * exit this process with a reason and optionally some info
 */
function exitError(reason, info) {
  console.error(`package.js -> error -> ${reason}`)
  if (fs.existsSync(tempFolder)) {
    fs.rmSync(tempFolder, { recursive: true, force: true })
  }
  if (info) {
    console.warn(`package.js -> ${info}`)
  }
  process.exit(1)
}

/**
 * exit this process with sucess, and delete temp folder by default
 */
function exitSuccess(keepTemp) {
  if (!keepTemp && fs.existsSync(tempFolder)) {
    fs.rmSync(tempFolder, { recursive: true, force: true })
  }
  process.exit(0)
}

if (process.argv.length != 5) {
  exitError('missing argument', usage)
} else {
  //1. check and prepare release
  const widgetName = process.argv[2]
  const exbPath = process.argv[3]
  const distLocation = process.argv[4]

  const exbBuildPath = `${exbPath}/client/dist/widgets`
  const widgetBuildPath = `${exbBuildPath}/${widgetName}/`
  const manifestJSON = JSON.parse(fs.readFileSync(`./src/${widgetName}/manifest.json`, 'utf8'))

  if (!fs.existsSync(exbPath)) {
    exitError(`EXB not found at '${exbPath}'`, usage)
  }

  const widgetInfoJSON = JSON.parse(fs.readFileSync(`${exbPath}/client/dist/widgets/widgets-info.json`, 'utf8'))
  const parfOfWidgetInfoJSON = widgetInfoJSON.filter((widget) => widget.name == widgetName)

  if (!fs.existsSync(widgetBuildPath) || parfOfWidgetInfoJSON.length == 0) {
    exitError(`No build found for '${widgetName}' at '${exbBuildPath}'`, usage)
  }

  if (manifestJSON.version !== parfOfWidgetInfoJSON[0].manifest.version) {
    exitError(
      `Mismatch version between your manifest.json (${manifestJSON.version}) and build (${parfOfWidgetInfoJSON[0].manifest.version}) found at '${exbPath}'.`,
      "You should rebuild the widget using 'build.sh'"
    )
  }

  if (!fs.existsSync(distLocation)) {
    exitError(`Dist location doesn't exit: '${distLocation}'`, usage)
  }

  const distFilePath = `${distLocation}/${widgetName}-${manifestJSON.version.toString().replaceAll('.', '_')}.zip`

  if (fs.existsSync(distFilePath)) {
    console.log(releaseTemp)
    exitError(`This widget has already been built: '${distFilePath}'`, usage)
  }

  //2. create release
  const releaseWidgetTemp = `./${releaseTemp}/${widgetName}`
  //remove any existing temp build
  if (fs.existsSync(releaseTemp)) {
    fs.rmSync(releaseTemp, { recursive: true, force: true })
  }
  //create temp folder
  fs.mkdirSync(releaseWidgetTemp, { recursive: true })
  //add widget info
  fs.writeFileSync(widgetInfoRef, JSON.stringify(parfOfWidgetInfoJSON[0], null, 2))
  //add widget
  fs.cpSync(widgetBuildPath, releaseWidgetTemp, { recursive: true })

  //zip if possible
  if (process.platform === 'darwin') {
    execSync(`cd ${tempFolder} && zip -vr ${distFilePath} . -x "*.DS_Store"`) //cd to avoid having 'tmp' in zip
    console.log(`Your release is available at: ${distFilePath}`)

    //3. clean
    exitSuccess()
  } else {
    console.log(`zip is only available for macOS, zip yourself the following folder: '${releaseTemp}'`)
    exitSuccess(true)
  }
}
