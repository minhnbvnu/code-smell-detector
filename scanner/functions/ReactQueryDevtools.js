function ReactQueryDevtools({
  initialIsOpen,
  panelProps = {},
  closeButtonProps = {},
  toggleButtonProps = {},
  position = 'bottom-left',
  containerElement: Container = 'footer',
}) {
  const rootRef = React.useRef()
  const panelRef = React.useRef()
  const [isOpen, setIsOpen] = useLocalStorage(
    'reactQueryDevtoolsOpen',
    initialIsOpen
  )
  const [isResolvedOpen, setIsResolvedOpen] = useSafeState(false)

  React.useEffect(() => {
    setIsResolvedOpen(isOpen)
  }, [isOpen, isResolvedOpen, setIsResolvedOpen])

  React[isServer ? 'useEffect' : 'useLayoutEffect'](() => {
    if (isResolvedOpen) {
      const previousValue = rootRef.current?.parentElement.style.paddingBottom

      const run = () => {
        const containerHeight = panelRef.current?.getBoundingClientRect().height
        rootRef.current.parentElement.style.paddingBottom = `${containerHeight}px`
      }

      run()

      window.addEventListener('resize', run)

      return () => {
        window.removeEventListener('resize', run)
        rootRef.current.parentElement.style.paddingBottom = previousValue
      }
    }
  }, [isResolvedOpen])

  const { style: panelStyle = {}, ...otherPanelProps } = panelProps

  const {
    style: closeButtonStyle = {},
    onClick: onCloseClick,
    ...otherCloseButtonProps
  } = closeButtonProps

  const {
    style: toggleButtonStyle = {},
    onClick: onToggleClick,
    ...otherToggleButtonProps
  } = toggleButtonProps

  return (
    <Container ref={rootRef} className="ReactQueryDevtools">
      {isResolvedOpen ? (
        <ThemeProvider theme={theme}>
          <ReactQueryDevtoolsPanel
            ref={panelRef}
            {...otherPanelProps}
            style={{
              position: 'fixed',
              bottom: '0',
              right: '0',
              zIndex: '99999',
              width: '100%',
              height: '500px',
              maxHeight: '90%',
              boxShadow: '0 0 20px rgba(0,0,0,.3)',
              borderTop: `1px solid ${theme.gray}`,
              ...panelStyle,
            }}
            setIsOpen={setIsOpen}
          />
          <Button
            {...otherCloseButtonProps}
            onClick={() => {
              setIsOpen(false)
              onCloseClick && onCloseClick()
            }}
            style={{
              position: 'fixed',
              zIndex: '99999',
              margin: '.5rem',
              bottom: 0,
              ...(position === 'top-right'
                ? {
                    right: '0',
                  }
                : position === 'top-left'
                ? {
                    left: '0',
                  }
                : position === 'bottom-right'
                ? {
                    right: '0',
                  }
                : {
                    left: '0',
                  }),
              ...closeButtonStyle,
            }}
          >
            Close
          </Button>
        </ThemeProvider>
      ) : (
        <button
          {...otherToggleButtonProps}
          aria-label="Open React Query Devtools"
          onClick={() => {
            setIsOpen(true)
            onToggleClick && onToggleClick()
          }}
          style={{
            background: 'none',
            border: 0,
            padding: 0,
            position: 'fixed',
            bottom: '0',
            right: '0',
            zIndex: '99999',
            display: 'inline-flex',
            fontSize: '1.5rem',
            margin: '.5rem',
            cursor: 'pointer',
            width: 'fit-content',
            ...(position === 'top-right'
              ? {
                  top: '0',
                  right: '0',
                }
              : position === 'top-left'
              ? {
                  top: '0',
                  left: '0',
                }
              : position === 'bottom-right'
              ? {
                  bottom: '0',
                  right: '0',
                }
              : {
                  bottom: '0',
                  left: '0',
                }),
            ...toggleButtonStyle,
          }}
        >
          <Logo aria-hidden />
        </button>
      )}
    </Container>
  )
}