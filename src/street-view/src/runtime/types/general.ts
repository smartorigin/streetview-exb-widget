/**
 * Name/Identifier of widget view
 */
export type WidgetViewType = 'streetview' | 'expanded' | 'default'

/**
 * Object storing state of the widget view
 */
export type WidgetViewStateType = {
  streetViewUrl: string | null
  streetViewWebUrl: string | null
  view: WidgetViewType
  isVisible: boolean
  isAvalaible: boolean
  isExpanded: boolean
  setView?: (view: WidgetViewType) => void
}

export type MessageType = {
  open: boolean
  message: string
  severity?: 'warning' | 'info' | 'error'
  shape?: 'none' | 'shape1' | 'shape2'
}

export type AlertType = {
  id: string
  open: boolean
  text: string
  title?: string
  type?: 'warning' | 'error' | 'info' | 'success'
  banner?: boolean
}
