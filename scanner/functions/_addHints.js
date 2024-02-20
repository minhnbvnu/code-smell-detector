function _addHints() {
    var self = this;

    var oldHintsWrapper = document.querySelector('.introjs-hints');

    if (oldHintsWrapper != null) {
      hintsWrapper = oldHintsWrapper;
    } else {
      var hintsWrapper = document.createElement('div');
      hintsWrapper.className = 'introjs-hints';
    }

    for (var i = 0, l = this._introItems.length; i < l; i++) {
      var item = this._introItems[i];

      // avoid append a hint twice
      if (document.querySelector('.introjs-hint[data-step="' + i + '"]'))
        continue;

      var hint = document.createElement('a');
      _setAnchorAsButton(hint);

      (function (hint, item, i) {
        // when user clicks on the hint element
        hint.onclick = function(e) {
          var evt = e ? e : window.event;
          if (evt.stopPropagation)    evt.stopPropagation();
          if (evt.cancelBubble != null) evt.cancelBubble = true;

          _hintClick.call(self, hint, item, i);
        };
      }(hint, item, i));

      hint.className = 'introjs-hint';

      if (!item.hintAnimation) {
        hint.className += ' introjs-hint-no-anim';
      }

      // hint's position should be fixed if the target element's position is fixed
      if (_isFixed(item.element)) {
        hint.className += ' introjs-fixedhint';
      }

      var hintDot = document.createElement('div');
      hintDot.className = 'introjs-hint-dot';
      var hintPulse = document.createElement('div');
      hintPulse.className = 'introjs-hint-pulse';

      hint.appendChild(hintDot);
      hint.appendChild(hintPulse);
      hint.setAttribute('data-step', i);

      // we swap the hint element with target element
      // because _setHelperLayerPosition uses `element` property
      item.targetElement = item.element;
      item.element = hint;

      // align the hint position
      _alignHintPosition.call(this, item.hintPosition, hint, item.targetElement);

      hintsWrapper.appendChild(hint);
    }

    // adding the hints wrapper
    document.body.appendChild(hintsWrapper);

    // call the callback function (if any)
    if (typeof (this._hintsAddedCallback) !== 'undefined') {
      this._hintsAddedCallback.call(this);
    }
  }