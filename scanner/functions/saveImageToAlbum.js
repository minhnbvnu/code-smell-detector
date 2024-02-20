function saveImageToAlbum(temps) {
 return PromiseForEach(temps, url => {
    return new Promise((resolve, reject) => {
      wx.saveImageToPhotosAlbum({
        filePath: url,
        success: function(res) {
          return resolve(res)
        },
        fail: function(err) {
          console.log(err)
        }
      })
    })
  })
   
}