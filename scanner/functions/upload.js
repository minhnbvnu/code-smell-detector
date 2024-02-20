function upload(filePath, success, fail, options) {
    if (null == filePath) {
      console.error('qiniu uploader need filePath to upload');
      return;
    }
    if (options) {
      updateConfigWithOptions(options);
    }
    if (config.qiniuUploadToken) {
      doUpload(filePath, success, fail, options);
    } else if (config.qiniuUploadTokenURL) {
      getQiniuToken(function () {
        doUpload(filePath, success, fail, options);
      });
    } else if (config.qiniuUploadTokenFunction) {
      config.qiniuUploadToken = config.qiniuUploadTokenFunction();
      if (null == config.qiniuUploadToken && config.qiniuUploadToken.length > 0) {
        console.error('qiniu UploadTokenFunction result is null, please check the return value');
        return
      }
    } else {
      console.error('qiniu uploader need one of [uptoken, uptokenURL, uptokenFunc]');
      return;
    }
  }