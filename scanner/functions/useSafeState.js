function useSafeState(initialState) {
  const isMounted = useIsMounted()
  const [state, setState] = React.useState(initialState)

  const safeSetState = React.useCallback(
    value => {
      scheduleMicrotask(() => {
        if (isMounted()) {
          setState(value)
        }
      })
    },
    [isMounted]
  )

  return [state, safeSetState]
}