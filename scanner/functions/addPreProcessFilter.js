function addPreProcessFilter(editor, filterFunc) {
      editor.on('PastePreProcess', function (e) {
        e.content = filterFunc(editor, e.content, e.internal, e.wordContent);
      });
    }