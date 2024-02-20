function getChecked() {
  return new Promise(function (resolve) {
    if (false) {}
    csmInstance.get(constants["s" /* DISABLED */], function (result) {
      resolve(result[constants["s" /* DISABLED */]]);
    });
  });
}