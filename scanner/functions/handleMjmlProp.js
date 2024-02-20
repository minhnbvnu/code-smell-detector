function handleMjmlProp(name, value) {
  if (typeof value === 'undefined' || value === null) {
    return undefined;
  }
  const handler = handlers[name] || ((_name, value_) => value_);
  return handler(name, value);
}