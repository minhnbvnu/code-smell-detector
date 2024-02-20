function repeatInsertModeChanges(cm, changes, repeat) {
      function keyHandler(binding) {
        if (typeof binding == 'string') {
          CodeMirror.commands[binding](cm);
        } else {
          binding(cm);
        }
        return true;
      }
      var head = cm.getCursor('head');
      var visualBlock = vimGlobalState.macroModeState.lastInsertModeChanges.visualBlock;
      if (visualBlock) {
        // Set up block selection again for repeating the changes.
        selectForInsert(cm, head, visualBlock + 1);
        repeat = cm.listSelections().length;
        cm.setCursor(head);
      }
      for (var i = 0; i < repeat; i++) {
        if (visualBlock) {
          cm.setCursor(offsetCursor(head, i, 0));
        }
        for (var j = 0; j < changes.length; j++) {
          var change = changes[j];
          if (change instanceof InsertModeKey) {
            CodeMirror.lookupKey(change.keyName, 'vim-insert', keyHandler);
          } else if (typeof change == "string") {
            var cur = cm.getCursor();
            cm.replaceRange(change, cur, cur);
          } else {
            var start = cm.getCursor();
            var end = offsetCursor(start, 0, change[0].length);
            cm.replaceRange(change[0], start, end);
          }
        }
      }
      if (visualBlock) {
        cm.setCursor(offsetCursor(head, 0, 1));
      }
    }