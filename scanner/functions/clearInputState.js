function clearInputState(cm, reason) {
      cm.state.vim.inputState = new InputState();
      CodeMirror.signal(cm, 'vim-command-done', reason);
    }