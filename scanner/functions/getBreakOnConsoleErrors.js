function getBreakOnConsoleErrors() {
  var _parseBool2;

  const raw = Object(storage["a" /* localStorageGetItem */])(constants["n" /* LOCAL_STORAGE_SHOULD_BREAK_ON_CONSOLE_ERRORS */]);
  return (_parseBool2 = parseBool(raw)) !== null && _parseBool2 !== void 0 ? _parseBool2 : false;
}