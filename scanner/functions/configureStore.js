function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}