function doKeysFn(cm) {
      return function(args) {
        if (args instanceof Array) {
          arguments = args;
        }
        for (var i = 0; i < arguments.length; i++) {
          var result = CodeMirror.Vim.handleKey(cm, arguments[i]);
          if (!result && cm.state.vim.insertMode) {
            cm.replaceSelections(fillArray(arguments[i], cm.listSelections().length));
          }
        }
      }
    }