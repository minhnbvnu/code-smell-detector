function downloadSaveImgs(obj) {
  let that = this
  let success = obj.success //下载成功
  let fail = obj.fail //下载失败
  let urls = obj.urls //下载地址 数组，支持多个 url下载 [url1,url2]
  var count = urls.length
  var imageList = []
  wx.showLoading({
    title: '图片下载中',
    mask: true
  })
  //  Promise 数组
  for (let i = 0; i < urls.length; i++) {
    imageList.push(getTempPath(urls[i]))
  }
  Promise.all(imageList)
    .then(res => {
      if (success) {
        success(res)
      }
    })
    .catch(err => {
      console.log(err)
    })
}