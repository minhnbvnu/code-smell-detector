function getWebCode(DEFAULTS) {
  return new Promise(function (resolve, reject) {
    dd.runtime.permission.requestAuthCode({
      corpId: DEFAULTS.corpId,
      onSuccess: function (result) {
        resolve(result.code);
      },
      onFail: function (err) {
        reject(err);
      }
    });
  });
}