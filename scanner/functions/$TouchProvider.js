function $TouchProvider($provide, $compileProvider) {

  /**
   * @ngdoc method
   * @name  $touchProvider#ngClickOverrideEnabled
   *
   * @param {boolean=} enabled update the ngClickOverrideEnabled state if provided, otherwise just return the
   * current ngClickOverrideEnabled state
   * @returns {*} current value if used as getter or itself (chaining) if used as setter
   *
   * @kind function
   *
   * @description
   * Call this method to enable/disable {@link ngTouch.ngClick ngTouch's ngClick directive}. If enabled,
   * the default ngClick directive will be replaced by a version that eliminates the 300ms delay for
   * click events on browser for touch-devices.
   *
   * The default is `false`.
   *
   */
  var ngClickOverrideEnabled = false;
  var ngClickDirectiveAdded = false;
  this.ngClickOverrideEnabled = function(enabled) {
    if (angular.isDefined(enabled)) {

      if (enabled && !ngClickDirectiveAdded) {
        ngClickDirectiveAdded = true;

        // Use this to identify the correct directive in the delegate
        ngTouchClickDirectiveFactory.$$moduleName = 'ngTouch';
        $compileProvider.directive('ngClick', ngTouchClickDirectiveFactory);

        $provide.decorator('ngClickDirective', ['$delegate', function($delegate) {
          if (ngClickOverrideEnabled) {
            // drop the default ngClick directive
            $delegate.shift();
          } else {
            // drop the ngTouch ngClick directive if the override has been re-disabled (because
            // we cannot de-register added directives)
            var i = $delegate.length - 1;
            while (i >= 0) {
              if ($delegate[i].$$moduleName === 'ngTouch') {
                $delegate.splice(i, 1);
                break;
              }
              i--;
            }
          }

          return $delegate;
        }]);
      }

      ngClickOverrideEnabled = enabled;
      return this;
    }

    return ngClickOverrideEnabled;
  };

  /**
  * @ngdoc service
  * @name $touch
  * @kind object
  *
  * @description
  * Provides the {@link ngTouch.$touch#ngClickOverrideEnabled `ngClickOverrideEnabled`} method.
  *
  */
  this.$get = function() {
    return {
      /**
       * @ngdoc method
       * @name  $touch#ngClickOverrideEnabled
       *
       * @returns {*} current value of `ngClickOverrideEnabled` set in the {@link ngTouch.$touchProvider $touchProvider},
       * i.e. if {@link ngTouch.ngClick ngTouch's ngClick} directive is enabled.
       *
       * @kind function
       */
      ngClickOverrideEnabled: function() {
        return ngClickOverrideEnabled;
      }
    };
  };

}