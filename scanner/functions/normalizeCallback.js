function normalizeCallback(callback) {
  if (callback && typeof callback.oncomplete === 'function') {
    // Unpack callback from FSReqWrap
    callback = callback.oncomplete.bind(callback);
  }
  return callback;
}