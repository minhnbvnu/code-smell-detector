function findTextNode(dom, text) {
    if (dom instanceof CodeMirror) dom = dom.getInputField()
    if (dom.nodeType == 1) {
      for (var ch = dom.firstChild; ch; ch = ch.nextSibling) {
        var found = findTextNode(ch, text)
        if (found) return found
      }
    } else if (dom.nodeType == 3 && dom.nodeValue == text) {
      return dom
    }
  }