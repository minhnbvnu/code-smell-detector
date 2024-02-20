function logRequestErrorWithCorrectionSelections(_, options) {
  var opts = options || {};
  var keys = Object.keys(opts);
  return Promise.resolve([keys[0], opts[keys[0]]]);
}