function initQiniu(configs) {
  var options = {
    region: configs.region, // 华北区
    uptoken: configs.token,
    domain: configs.domain,
    shouldUseQiniuFileName: false
  };
  qiniuUploader.init(options);
}