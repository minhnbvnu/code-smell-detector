function _removeHint(stepId) {
    var hint = this._targetElement.querySelector('.introjs-hint[data-step="' + stepId + '"]');

    if (hint) {
      hint.parentNode.removeChild(hint);
    }
  }