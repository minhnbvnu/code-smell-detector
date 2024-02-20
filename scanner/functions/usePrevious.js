function usePrevious(theme) {
  const ref = useRef()
  useEffect(() => {
    ref.current = theme
  })
  return ref.current
}