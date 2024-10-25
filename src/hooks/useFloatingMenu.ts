import type { FloatingContext, Placement } from '@floating-ui/react'
import {
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useFloating,
  useId,
} from '@floating-ui/react'

type FloatMenuProps = {
  placement?: Placement
  matchTriggerWidth?: boolean
}

export const useFloatingMenu = (props: FloatMenuProps = {}) => {
  const { placement, matchTriggerWidth } = props

  const floatingSize = size({
    apply({ rects, elements }) {
      Object.assign(elements.floating.style, {
        width: `${rects.reference.width}px`,
      })
    },
  })

  const floating = useFloating({
    whileElementsMounted: autoUpdate,
    placement: placement ?? 'bottom',
    middleware: [
      offset(10),
      flip({ fallbackAxisSideDirection: 'end' }),
      shift(),
      ...(matchTriggerWidth ? [floatingSize] : []),
    ],
  })

  const { refs, floatingStyles, context } = floating

  const triggerProps = { ref: refs.setReference }
  const focusManagerProps = { context, modal: false }
  const headingId = useId()
  const menuProps = {
    className: 'z-[1]',
    ref: refs.setFloating,
    style: floatingStyles,
    'aria-labelledby': headingId,
  }

  const floatingMenu: FloatingMenu = {
    triggerProps,
    focusManagerProps,
    menuProps,
  }

  return floatingMenu
}

type TriggerProps = {
  ref: (node: HTMLButtonElement | null) => void
}

type FocusManagerProps = {
  context: FloatingContext
  modal: boolean
}

type MenuProps = {
  ref: (node: HTMLDivElement | null) => void
  style: React.CSSProperties
  'aria-labelledby': string
}

export type FloatingMenu = {
  triggerProps: TriggerProps
  focusManagerProps: FocusManagerProps
  menuProps: MenuProps
}
