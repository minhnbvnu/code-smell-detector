function DebugLayer(animator) {
      this._renderEnd = __bind(this._renderEnd, this);
      this._renderStart = __bind(this._renderStart, this);
      this.render = __bind(this.render, this);
      this._msg = '';
      this._fps = 30;
      animator.onBefore(this._renderStart);
      animator.onAfter(this._renderEnd);
    }