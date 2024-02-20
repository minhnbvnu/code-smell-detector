function leaveVimMode(cm) {
      cm.setOption('disableInput', false);
      cm.off('cursorActivity', onCursorActivity);
      CodeMirror.off(cm.getInputField(), 'paste', getOnPasteFn(cm));
      cm.state.vim = null;
    }