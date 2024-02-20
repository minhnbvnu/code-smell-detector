function dropChangeHandler (e) {
    e.preventDefault()
    e = e.originalEvent
    var target = e.dataTransfer || e.target
    var file = target && target.files && target.files[0]
    var options = {
      maxWidth: result.width(),
      canvas: true,
      pixelRatio: window.devicePixelRatio,
      downsamplingRatio: 0.5
    }
    if (!file) {
      return
    }
    exifNode.hide()
    thumbNode.hide()
    loadImage.parseMetaData(file, function (data) {
      if (data.exif) {
        options.orientation = data.exif.get('Orientation')
        displayExifData(data.exif)
      }
      displayImage(file, options)
    })
  }