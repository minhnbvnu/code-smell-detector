function generateStore ({
  drizzleOptions,
  appReducers = {},
  appSagas = [],
  appMiddlewares = [],
  disableReduxDevTools = false,
  ...options
}) {
  // Note: Preserve backwards compatibility for passing options to
  // `generateStore`.  in drizzle v1.3.3 and prior of generate had a signature
  // of `generateStore(options)`.
  //
  // The updated signature looks for `drizzleOptions`, `appReducers`,
  // `appSagas`, `initialAppStore` and `disableReduxDevTools` while
  // {...options} captures the previous release's signature.
  //
  // Resolve drizzleOptions. If called by dapps written to previous API, then
  // drizzleOptions will be `undefined` and will resolve to rest constructed
  // options.
  //
  drizzleOptions = drizzleOptions || options

  const composeEnhancers = !disableReduxDevTools
    ? global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose

  let initialContractsState = {
    contracts: generateContractsInitialState(drizzleOptions)
  }

  const sagaMiddleware = createSagaMiddleware()
  const allMiddlewares = [...appMiddlewares, sagaMiddleware, drizzleMW]
  const allReducers = { ...drizzleReducers, ...appReducers }

  const store = createStore(
    combineReducers(allReducers),
    initialContractsState,
    composeEnhancers(applyMiddleware(...allMiddlewares))
  )

  sagaMiddleware.run(composeSagas([...drizzleSagas, ...appSagas]))
  return store
}