function updateLocationAndTitle() {
      var cm = getCodeMirror()
      if (cm) {
        var text = cm.getValue()
        var compressedText = window.LZString.compressToEncodedURIComponent(
          text.replace(/[ \t]*[\n][ \t]*/g, '\n')
        )
        var lines = Object.keys(highlightedLines)
          .map(function(l) {
            return 'L' + l
          })
          .join('&')
        history.replaceState(
          null,
          '',
          window.location.pathname +
            '#' +
            compressedText +
            (lines ? '&' + lines : '')
        )
        updateTitle(text)
      }
    }