function onDetached() {
      if (this._isAttached) {
        this._isAttached = false;
        this.$children.forEach(callDetach);
      }
    }