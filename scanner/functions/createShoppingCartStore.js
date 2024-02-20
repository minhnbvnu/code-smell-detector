function createShoppingCartStore(options) {
  options.shouldPersist = options.shouldPersist ?? true

  if (!isClient) {
    return configureStore({
      reducer,
      preloadedState: { ...initialState, ...options }
    })
  }
  let storage
  if (isClient) storage = options.storage || createLocalStorage()
  else storage = createNoopStorage()
  delete options.storage

  const persistConfig = {
    key: options.persistKey ?? 'root',
    version: 1,
    storage,
    whitelist: ['cartCount', 'totalPrice', 'formattedTotalPrice', 'cartDetails']
  }
  const persistedReducer = persistReducer(persistConfig, reducer)

  const newInitialState = { ...initialState, ...options }
  updateFormattedTotalPrice(newInitialState)

  return configureStore({
    reducer: options.shouldPersist ? persistedReducer : reducer,
    preloadedState: newInitialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          ignoredActionPaths: ['persist']
        }
      }).concat(handleStripe, handleWarnings)
  })
}