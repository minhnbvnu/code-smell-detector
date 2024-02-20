function replaceResults (img) {
    var content
    if (!(img.src || img instanceof HTMLCanvasElement)) {
      content = $('<span>Loading image file failed</span>')
    } else {
      content = $('<a target="_blank">').append(img)
        .attr('download', currentFile.name)
        .attr('href', img.src || img.toDataURL())
    }
    result.children().replaceWith(content)
    if (img.getContext) {
      actionsNode.show()
    }
  }