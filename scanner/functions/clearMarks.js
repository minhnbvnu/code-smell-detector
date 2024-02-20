function clearMarks(editor, arr, classes) {
    for (var i = 0; i < arr.length; ++i) {
      var mark = arr[i];
      if (mark instanceof CodeMirror.TextMarker)
        mark.clear();
      else if (mark.parent)
        removeClass(editor, mark, classes);
    }
    arr.length = 0;
  }