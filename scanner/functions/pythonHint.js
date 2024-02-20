function pythonHint(editor) {
    return scriptHint(editor, pythonKeywordsU, function (e, cur) {return e.getTokenAt(cur);});
  }