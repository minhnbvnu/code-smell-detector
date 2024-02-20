function getActiveKeys() {
  return new Promise(function (resolve) {
    if (false) {}
    csmInstance.get(defineProperty_default()({}, constants["b" /* ACTIVE_KEYS */], ['0']), function (result) {
      resolve(result[constants["b" /* ACTIVE_KEYS */]]);
    });
  });
}