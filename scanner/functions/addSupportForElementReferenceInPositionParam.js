function addSupportForElementReferenceInPositionParam(config) {
    if (config.errorMessagePosition && typeof config.errorMessagePosition === 'object') {
      $.formUtils.warn('Deprecated use of config parameter errorMessagePosition, use config.submitErrorMessageCallback instead');
      var $errorMessageContainer = config.errorMessagePosition;
      config.errorMessagePosition = 'top';
      config.submitErrorMessageCallback = function() {
        return $errorMessageContainer;
      };
    }
  }