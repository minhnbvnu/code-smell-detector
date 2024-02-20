function copyTextToClipboard(text) {
        var textArea = document.createElement('textarea')
        textArea.value = text
        document.body.prependChild(textArea)
        textArea.focus()
        textArea.select()
        try {
          document.execCommand('copy')
        } finally {
          document.body.removeChild(textArea)
        }
      }