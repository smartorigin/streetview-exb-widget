import { Alert } from 'jimu-ui'
import type React from 'react'
import type { AlertType } from '../types/general'

type FloatingAlertsProps = {
  alerts: AlertType[]
  setAlerts: React.Dispatch<React.SetStateAction<AlertType[]>>
}

export default function FloatingAlerts(props: FloatingAlertsProps) {
  return (
    <>
      {props.alerts.map((alert) => (
        <Alert
          key={alert.id}
          className="widget-content-animated h-fit"
          style={{
            whiteSpace: 'nowrap'
          }}
          open={alert.open}
          shape="none"
          size="small"
          type={alert.type}
          text={alert.text}
          title={alert.title}
          variant="text"
          withIcon
          aria-live="polite"
          closable
          form="basic"
          onClose={() => {
            props.setAlerts(props.alerts.filter((a) => a.id !== alert.id))
          }}
        />
      ))}
    </>
  )
}
