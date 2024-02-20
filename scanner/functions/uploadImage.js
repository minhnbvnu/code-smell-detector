function uploadImage(configs,image, callback = null) {
  initQiniu(configs);
  let filePath = image;
  qiniuUploader.upload(filePath, (res) => {
    callback(res);
  });
}