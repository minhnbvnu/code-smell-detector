function CartProvider({ loading = null, children, ...props }) {
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  const store = React.useMemo(() => createShoppingCartStore(props), [props])

  if (props.shouldPersist && isClient) {
    const persistor = persistStore(store)

    return (
      <Provider context={CartContext} store={store}>
        <PersistGate persistor={persistor}>{() => children}</PersistGate>
      </Provider>
    )
  } else {
    return (
      <Provider context={CartContext} store={store}>
        {children}
      </Provider>
    )
  }
}