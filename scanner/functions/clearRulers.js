function clearRulers(cm) {
    for (var i = cm.display.lineSpace.childNodes.length - 1; i >= 0; i--) {
      var node = cm.display.lineSpace.childNodes[i];
      if (/(^|\s)CodeMirror-ruler($|\s)/.test(node.className))
        node.parentNode.removeChild(node);
    }
  }