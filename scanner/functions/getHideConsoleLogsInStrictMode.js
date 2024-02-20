function getHideConsoleLogsInStrictMode() {
  var _parseBool3;

  const raw = Object(storage["a" /* localStorageGetItem */])(constants["j" /* LOCAL_STORAGE_HIDE_CONSOLE_LOGS_IN_STRICT_MODE */]);
  return (_parseBool3 = parseBool(raw)) !== null && _parseBool3 !== void 0 ? _parseBool3 : false;
}