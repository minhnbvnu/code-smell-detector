function _done() {
      if (_resolved) return;
      _resolved = true;
      master.off('eb_clear_done', _callback);
      if (_timeout) {
        clearTimeout(_timeout);
        _timeout = null;
      }
      resolve(true);
    }