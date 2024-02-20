function isOpen() {
  return store.dispatch(actions.getOpenState());
}