function storeObserver(WrappedComponent) {
  return inject("store")(observer(WrappedComponent));
}