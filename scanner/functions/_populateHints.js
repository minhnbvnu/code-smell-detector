function _populateHints(targetElm) {
    var self = this;
    this._introItems = [];

    if (this._options.hints) {
      for (var i = 0, l = this._options.hints.length; i < l; i++) {
        var currentItem = _cloneObject(this._options.hints[i]);

        if (typeof(currentItem.element) === 'string') {
          //grab the element with given selector from the page
          currentItem.element = document.querySelector(currentItem.element);
        }

        currentItem.hintPosition = currentItem.hintPosition || this._options.hintPosition;
        currentItem.hintAnimation = currentItem.hintAnimation || this._options.hintAnimation;

        if (currentItem.element != null) {
          this._introItems.push(currentItem);
        }
      }
    } else {
      var hints = targetElm.querySelectorAll('*[data-hint]');

      if (hints.length < 1) {
        return false;
      }

      //first add intro items with data-step
      for (var i = 0, l = hints.length; i < l; i++) {
        var currentElement = hints[i];

        // hint animation
        var hintAnimation = currentElement.getAttribute('data-hintAnimation');

        if (hintAnimation) {
          hintAnimation = (hintAnimation == 'true');
        } else {
          hintAnimation = this._options.hintAnimation;
        }

        this._introItems.push({
          element: currentElement,
          hint: currentElement.getAttribute('data-hint'),
          hintPosition: currentElement.getAttribute('data-hintPosition') || this._options.hintPosition,
          hintAnimation: hintAnimation,
          tooltipClass: currentElement.getAttribute('data-tooltipClass'),
          position: currentElement.getAttribute('data-position') || this._options.tooltipPosition
        });
      }
    }

    _addHints.call(this);

    if (document.addEventListener) {
      document.addEventListener('click', _removeHintTooltip.bind(this), false);
      //for window resize
      window.addEventListener('resize', _reAlignHints.bind(this), true);
    } else if (document.attachEvent) { //IE
      //for window resize
      document.attachEvent('onclick', _removeHintTooltip.bind(this));
      document.attachEvent('onresize', _reAlignHints.bind(this));
    }
  }