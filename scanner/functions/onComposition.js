function onComposition(cm) {
    setTimeout(function() {
      var empty = false, input = cm.getInputField()
      if (input.nodeName == "TEXTAREA")
        empty = !input.value
      else if (cm.lineCount() == 1)
        empty = !/[^\u200b]/.test(input.querySelector(".CodeMirror-line").textContent)
      if (empty) setPlaceholder(cm)
      else clearPlaceholder(cm)
    }, 20)
  }