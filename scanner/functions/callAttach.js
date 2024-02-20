function callAttach(child) {
      if (!child._isAttached && inDoc(child.$el)) {
        child._callHook('attached');
      }
    }