function onAttached() {
      if (!this._isAttached) {
        this._isAttached = true;
        this.$children.forEach(callAttach);
      }
    }