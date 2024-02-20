function _refresh() {
    // re-align intros
    _setHelperLayerPosition.call(this, document.querySelector('.introjs-helperLayer'));
    _setHelperLayerPosition.call(this, document.querySelector('.introjs-tooltipReferenceLayer'));

    // re-align tooltip
    if(this._currentStep !== undefined && this._currentStep !== null) {
      var oldHelperNumberLayer = document.querySelector('.introjs-helperNumberLayer'),
        oldArrowLayer        = document.querySelector('.introjs-arrow'),
        oldtooltipContainer  = document.querySelector('.introjs-tooltip');
      _placeTooltip.call(this, this._introItems[this._currentStep].element, oldtooltipContainer, oldArrowLayer, oldHelperNumberLayer);
    }

    //re-align hints
    _reAlignHints.call(this);
    return this;
  }