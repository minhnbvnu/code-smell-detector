function extractDescriptor(name, listener) {
  return Object.assign(_.omit(listener, 'didDispatch'), {
    name,
    displayName: listener.displayName
      ? listener.displayName
      : _.humanizeEventName(name)
  });
}