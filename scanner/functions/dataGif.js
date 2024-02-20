function dataGif(url, cb) {
  process.nextTick(function() {
    try {
      var buffer = parseDataURI(url)
      if(buffer) {
        handleGif(copyBuffer(buffer), cb)
      } else {
        cb(new Error('Error parsing data URI'))
      }
    } catch(err) {
      cb(err)
    }
  })
}