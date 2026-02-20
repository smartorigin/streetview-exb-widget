export function isExbVersionUnder(version: string, targetMajor: number, targetMinor: number): boolean {
  const [major, minor] = (version || '').split('.').map((part) => Number.parseInt(part, 10))
  if (!Number.isFinite(major) || !Number.isFinite(minor)) return false
  return major < targetMajor || (major === targetMajor && minor < targetMinor)
}
