function isCustomProp(name) {
  return isEventProp(name) || name === 'forceUpdate';
}