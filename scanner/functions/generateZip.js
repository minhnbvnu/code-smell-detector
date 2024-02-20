function generateZip(css, js, fonts, config, complete) {
    if (!css && !js) return showError('<strong>Ruh roh!</strong> No Bootstrap files selected.', new Error('no Bootstrap'))

    var zip = new JSZip()

    if (css) {
      var cssFolder = zip.folder('css')
      for (var fileName in css) {
        cssFolder.file(fileName, css[fileName])
      }
    }

    if (js) {
      var jsFolder = zip.folder('js')
      for (var fileName in js) {
        jsFolder.file(fileName, js[fileName])
      }
    }

    if (fonts) {
      var fontsFolder = zip.folder('fonts')
      for (var fileName in fonts) {
        fontsFolder.file(fileName, fonts[fileName], {base64: true})
      }
    }

    if (config) {
      zip.file('config.json', config)
    }

    var content = zip.generate({type:"blob"})

    complete(content)
  }