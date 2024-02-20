function cmKey(key, cm) {
      if (!cm) { return undefined; }
      if (this[key]) { return this[key]; }
      var vimKey = cmKeyToVimKey(key);
      if (!vimKey) {
        return false;
      }
      var cmd = CodeMirror.Vim.findKey(cm, vimKey);
      if (typeof cmd == 'function') {
        CodeMirror.signal(cm, 'vim-keypress', vimKey);
      }
      return cmd;
    }