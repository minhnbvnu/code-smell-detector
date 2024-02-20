function getShowInlineWarningsAndErrors() {
  var _parseBool4;

  const raw = Object(storage["a" /* localStorageGetItem */])(constants["o" /* LOCAL_STORAGE_SHOW_INLINE_WARNINGS_AND_ERRORS_KEY */]);
  return (_parseBool4 = parseBool(raw)) !== null && _parseBool4 !== void 0 ? _parseBool4 : true;
}