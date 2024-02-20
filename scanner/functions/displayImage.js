function displayImage (file, options) {
    currentFile = file
    if (!loadImage(
        file,
        replaceResults,
        options
      )) {
      result.children().replaceWith(
        $('<span>Your browser does not support the URL or FileReader API.</span>')
      )
    }
  }