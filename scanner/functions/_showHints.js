function _showHints() {
    var hints = this._targetElement.querySelectorAll('.introjs-hint');

    if (hints && hints.length > 0) {
      for (var i = 0; i < hints.length; i++) {
        _showHint.call(this, hints[i].getAttribute('data-step'));
      }
    } else {
      _populateHints.call(this, this._targetElement);
    }
  }