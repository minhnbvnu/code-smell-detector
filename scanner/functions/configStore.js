function configStore () {
  const store = createStore(rootReducer, enhancer)
  return store
}