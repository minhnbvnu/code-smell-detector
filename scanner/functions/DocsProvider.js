function DocsProvider({ children }) {
  const [docsState, dispatch] = useReducer(docsReducer, docsInitialState)

  return (
    <DocsContext.Provider value={{ docsState, dispatch }}>
      {children}
    </DocsContext.Provider>
  )
}