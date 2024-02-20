function updateConfigWithOptions(options) {

    console.log(JSON.stringify(options));

    if (options.region) {

      config.qiniuRegion = options.region;

    } else {

      console.error('qiniu uploader need your bucket region');

    }
    if (options.uptoken) {

      config.qiniuUploadToken = options.uptoken;

    } else if (options.uptokenURL) {

      config.qiniuUploadTokenURL = options.uptokenURL;

    } else if (options.uptokenFunc) {

      config.qiniuUploadTokenFunction = options.uptokenFunc;

    }
    if (options.domain) {

      config.qiniuImageURLPrefix = options.domain;

    }
    config.qiniuShouldUseQiniuFileName = options.shouldUseQiniuFileName
  }