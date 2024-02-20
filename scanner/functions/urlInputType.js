function urlInputType(scope, element, attr, ctrl, $sniffer, $browser) {
  // Note: no badInputChecker here by purpose as `url` is only a validation
  // in browsers, i.e. we can always read out input.value even if it is not valid!
  baseInputType(scope, element, attr, ctrl, $sniffer, $browser);
  stringBasedInputType(ctrl);

  ctrl.$$parserName = 'url';
  ctrl.$validators.url = function(modelValue, viewValue) {
    var value = modelValue || viewValue;
    return ctrl.$isEmpty(value) || URL_REGEXP.test(value);
  };
}