function displayExifData (exif) {
    var thumbnail = exif.get('Thumbnail')
    var tags = exif.getAll()
    var table = exifNode.find('table').empty()
    var row = $('<tr></tr>')
    var cell = $('<td></td>')
    var prop
    if (thumbnail) {
      thumbNode.empty()
      loadImage(thumbnail, function (img) {
        thumbNode.append(img).show()
      }, {orientation: exif.get('Orientation')})
    }
    for (prop in tags) {
      if (tags.hasOwnProperty(prop)) {
        table.append(
          row.clone()
            .append(cell.clone().text(prop))
            .append(cell.clone().text(tags[prop]))
        )
      }
    }
    exifNode.show()
  }