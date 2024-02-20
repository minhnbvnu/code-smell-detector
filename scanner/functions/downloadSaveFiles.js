function downloadSaveFiles(obj) {
  let that = this
  let success = obj.success //下载成功
  let fail = obj.fail //下载失败
  wx.getSetting({
    success(res) {
      if (!res.authSetting['scope.writePhotosAlbum']) {
        // 如果没有写入权限，则获取写入相册权限
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success() {
            // 用户已经同意小程序使用保存相册功能
            downloadSaveImgs(obj)
          },
          fail() {
            // 用户拒绝授权
            wx.showModal({
              content: '检测到您没打开头号买手的相册权限，是否去设置打开？',
              confirmText: '确认',
              cancelText: '取消',
              success: function(res) {
                if (res.confirm) {
                  wx.openSetting({
                    success: res => {}
                  })
                }
              }
            })
          }
        })
      } else {
        // 已经授权过直接保存
        downloadSaveImgs(obj)
      }
    },
    fail(e) {
      if (fail) {
        fail(e)
      }
    }
  })
}