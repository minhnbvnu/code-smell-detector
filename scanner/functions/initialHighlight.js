function initialHighlight() {
      const cm = getCodeMirror()
      if (
        cm &&
        document.querySelectorAll('.klipse-snippet .CodeMirror-line').length
      ) {
        cm.on('change', function() {
          highlightLines((highlightedLines = {}))
        })
        highlightLines()
      } else {
        setTimeout(initialHighlight, 100)
      }
    }