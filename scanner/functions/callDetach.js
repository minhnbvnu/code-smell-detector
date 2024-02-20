function callDetach(child) {
      if (child._isAttached && !inDoc(child.$el)) {
        child._callHook('detached');
      }
    }