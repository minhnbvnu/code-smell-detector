function multiSelectHandleKey(cm, key, origin) {
    var isHandled = false;
    var vim = Vim.maybeInitVimState_(cm);
    var visualBlock = vim.visualBlock || vim.wasInVisualBlock;
    if (vim.wasInVisualBlock && !cm.ace.inMultiSelectMode) {
      vim.wasInVisualBlock = false;
    } else if (cm.ace.inMultiSelectMode && vim.visualBlock) {
       vim.wasInVisualBlock = true;
    }
    
    if (key == '<Esc>' && !vim.insertMode && !vim.visualMode && cm.ace.inMultiSelectMode) {
      cm.ace.exitMultiSelectMode();
    } else if (visualBlock || !cm.ace.inMultiSelectMode || cm.ace.inVirtualSelectionMode) {
      isHandled = Vim.handleKey(cm, key, origin);
    } else {
      var old = cloneVimState(vim);
      cm.operation(function() {
        cm.ace.forEachSelection(function() {
          var sel = cm.ace.selection;
          cm.state.vim.lastHPos = sel.$desiredColumn == null ? sel.lead.column : sel.$desiredColumn;
          var head = cm.getCursor("head");
          var anchor = cm.getCursor("anchor");
          var headOffset = !cursorIsBefore(head, anchor) ? -1 : 0;
          var anchorOffset = cursorIsBefore(head, anchor) ? -1 : 0;
          head = offsetCursor(head, 0, headOffset);
          anchor = offsetCursor(anchor, 0, anchorOffset);
          cm.state.vim.sel.head = head;
          cm.state.vim.sel.anchor = anchor;
          
          isHandled = handleKey(cm, key, origin);
          sel.$desiredColumn = cm.state.vim.lastHPos == -1 ? null : cm.state.vim.lastHPos;
          if (cm.virtualSelectionMode()) {
            cm.state.vim = cloneVimState(old);
          }
        });
        if (cm.curOp.cursorActivity && !isHandled)
          cm.curOp.cursorActivity = false;
      }, true);
    }
    if (isHandled && !vim.visualMode && !vim.insert)
      handleExternalSelection(cm, vim);
    return isHandled;
  }