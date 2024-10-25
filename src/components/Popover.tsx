import type { ReactElement } from 'react'
import type { Placement } from '@floating-ui/react'
import {
  Fragment,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useRef,
  useState,
} from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useId,
  FloatingFocusManager,
  arrow,
} from '@floating-ui/react'
import { Transition } from '@headlessui/react'
import { cn } from '~/utils/cn'
import clsx from 'clsx'

type PopoverProps = {
  children: React.ReactNode
  placement?: Placement
  offset?: number
  show?: boolean
  setShow?: (show: boolean) => void
}

export const Popover = (props: PopoverProps) => {
  const {
    children,
    placement,
    offset: offsetOption,
    show: controlledShow,
    setShow: controlledSetShow,
  } = props

  const [uncontrolledShow, setUncontrolledShow] = useState(false)
  const show = controlledShow ?? uncontrolledShow
  const setShow = controlledSetShow ?? setUncontrolledShow

  const arrowRef = useRef<HTMLDivElement | null>(null)

  const popover = useFloating({
    open: show,
    onOpenChange: setShow,
    whileElementsMounted: autoUpdate,
    placement: placement ?? 'bottom',
    middleware: [
      offset(offsetOption ?? 10),
      flip({ fallbackAxisSideDirection: 'end' }),
      shift({ padding: 25 }),
      arrow({ element: arrowRef }),
    ],
  })

  const { context } = popover

  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context)
  const interactions = useInteractions([click, dismiss, role])

  const contextValues = {
    popover,
    interactions,
    arrowRef,
    show,
    setShow,
  }

  return (
    <PopoverContext.Provider value={contextValues}>
      {children}
    </PopoverContext.Provider>
  )
}

type TriggerProps = {
  children: ReactElement
}

const Trigger: React.FC<TriggerProps> = (props) => {
  const { children } = props
  const { interactions, popover } = usePopoverContext()
  const { refs } = popover

  const triggerProps = {
    ...interactions.getReferenceProps(),
    ref: refs.setReference,
  }

  if (!isValidElement(children)) return null
  return cloneElement(children, { ...triggerProps })
}

type MenuProps = {
  children: React.ReactNode
}

const Content: React.FC<MenuProps> = (props) => {
  const { children } = props
  const { show, interactions, popover } = usePopoverContext()
  const { refs, floatingStyles, context } = popover

  const headingId = useId()

  const focusManagerProps = {
    context,
    modal: false,
  }

  const menuProps = {
    ...interactions.getFloatingProps(),
    ref: refs.setFloating,
    style: floatingStyles,
    'aria-labelledby': headingId,
  }

  return (
    <FloatingFocusManager {...focusManagerProps}>
      <div {...menuProps} className='z-[1]'>
        <Transition
          as={Fragment}
          show={show}
          enter='ease-out duration-150 relative'
          enterFrom='opacity-0 -top-3'
          enterTo='opacity-100 top-0'
          leave='ease-in duration-150 relative'
          leaveFrom='opacity-100 top-0'
          leaveTo='opacity-0 top-3'
        >
          <div>{children}</div>
        </Transition>
      </div>
    </FloatingFocusManager>
  )
}

type ArrowProps = {
  className?: string
}

const Arrow: React.FC<ArrowProps> = (props) => {
  const { arrowRef, popover } = usePopoverContext()
  const { className } = props

  if (!popover.middlewareData?.arrow) return null
  const { x, y } = popover.middlewareData.arrow
  const { placement } = popover

  type directions = 'top' | 'left' | 'bottom' | 'right'
  const side = placement.split('-')[0] as directions

  const classes = {
    top: { wrapper: 'top-full w-6', arrow: '-translate-y-1/2' },
    right: { wrapper: 'right-full h-6', arrow: 'translate-x-1/2' },
    bottom: { wrapper: 'bottom-full w-6', arrow: 'translate-y-1/2' },
    left: { wrapper: 'left-full h-6', arrow: '-translate-x-1/2' },
  }

  const arrowStyles = {
    left: x != null ? `${x}px` : '',
    top: y != null ? `${y}px` : '',
  }

  const wrapperClasses = clsx(
    'absolute flex items-center justify-center overflow-hidden',
    classes[side].wrapper,
  )

  const arrowClasses = cn(
    'z-10 size-2.5 rotate-45',
    classes[side].arrow,
    className,
  )

  return (
    <div ref={arrowRef} style={arrowStyles} className={wrapperClasses}>
      <div className={arrowClasses} />
    </div>
  )
}

type ExitProps = {
  children: ReactElement
}

const Exit: React.FC<ExitProps> = (props) => {
  const { children } = props
  const { setShow } = usePopoverContext()

  if (!isValidElement(children)) return null
  return cloneElement(children, {
    onClick: () => setShow(false),
  } as Partial<ReactElement>)
}

type PopoverContextProps = {
  popover: ReturnType<typeof useFloating>
  interactions: ReturnType<typeof useInteractions>
  arrowRef: React.MutableRefObject<HTMLDivElement | null>
  show: boolean
  setShow: (show: boolean) => void
}

const PopoverContext = createContext<PopoverContextProps | undefined>(undefined)

export const usePopoverContext = () => {
  const context = useContext(PopoverContext)

  if (context === undefined) {
    throw new Error(`useFloatContext must be used within a Float component`)
  }

  return context
}

Popover.Trigger = Trigger
Popover.Content = Content
Popover.Arrow = Arrow
Popover.Exit = Exit
