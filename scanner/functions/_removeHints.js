function _removeHints() {
    var hints = this._targetElement.querySelectorAll('.introjs-hint');

    if (hints && hints.length > 0) {
      for (var i = 0; i < hints.length; i++) {
        _removeHint.call(this, hints[i].getAttribute('data-step'));
      }
    }
  }