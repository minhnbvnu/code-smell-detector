function addPostProcessFilter(editor, filterFunc) {
      editor.on('PastePostProcess', function (e) {
        filterFunc(editor, e.node);
      });
    }