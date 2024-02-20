function getTempPath(str) {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url: str,
      success: function(res) {
        var temp = res.tempFilePath
        resolve(temp)
      },
      fail: function(err) {
        reject(err)
      }
    })
  })
}