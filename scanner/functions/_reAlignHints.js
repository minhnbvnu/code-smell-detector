function _reAlignHints() {
    for (var i = 0, l = this._introItems.length; i < l; i++) {
      var item = this._introItems[i];

      if (typeof (item.targetElement) == 'undefined') continue;

      _alignHintPosition.call(this, item.hintPosition, item.element, item.targetElement)
    }
  }