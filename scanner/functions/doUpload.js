function doUpload(filePath, success, fail, options) {

    if(!config.qiniuUploadToken){
      config.qiniuUploadToken = wx.getStorageSync('uploadToken');
    }

    if (null == config.qiniuUploadToken && config.qiniuUploadToken.length > 0) {
      console.error('qiniu UploadToken is null, please check the init config or networking');
      return
    }
    var url = uploadURLFromRegionCode(config.qiniuRegion);
    var fileName = filePath.split('//')[1];
    if (options && options.key) {
      fileName = options.key;
    }
    var formData = {
      'token': config.qiniuUploadToken
    };
    if (!config.qiniuShouldUseQiniuFileName) {
      formData['key'] = fileName
    }

    wx.uploadFile({
      url: url,
      filePath: filePath,
      name: 'file',
      formData: formData,
      success: function (res) {
        console.log('success:' + res);
        var dataString = res.data
        try {
          var dataObject = JSON.parse(dataString);
          //do something
          var imageUrl = config.qiniuImageURLPrefix + '/' + dataObject.key;
          dataObject.imageURL = imageUrl;
          console.log(dataObject);
          if (success) {
            success(dataObject);
          }
        } catch (e) {
          console.log('parse JSON failed, origin String is: ' + dataString)
          if (fail) {
            fail(e);
          }
        }
      },
      fail: function (error) {
        console.error(error);
        if (fail) {
          fail(error);
        }
      }
    })
  }