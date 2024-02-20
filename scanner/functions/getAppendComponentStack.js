function getAppendComponentStack() {
  var _parseBool;

  const raw = Object(storage["a" /* localStorageGetItem */])(constants["m" /* LOCAL_STORAGE_SHOULD_APPEND_COMPONENT_STACK_KEY */]);
  return (_parseBool = parseBool(raw)) !== null && _parseBool !== void 0 ? _parseBool : true;
}