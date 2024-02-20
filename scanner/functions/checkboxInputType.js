function checkboxInputType(scope, element, attr, ctrl, $sniffer, $browser, $filter, $parse) {
  var trueValue = parseConstantExpr($parse, scope, 'ngTrueValue', attr.ngTrueValue, true);
  var falseValue = parseConstantExpr($parse, scope, 'ngFalseValue', attr.ngFalseValue, false);

  var listener = function(ev) {
    ctrl.$setViewValue(element[0].checked, ev && ev.type);
  };

  element.on('click', listener);

  ctrl.$render = function() {
    element[0].checked = ctrl.$viewValue;
  };

  // Override the standard `$isEmpty` because the $viewValue of an empty checkbox is always set to `false`
  // This is because of the parser below, which compares the `$modelValue` with `trueValue` to convert
  // it to a boolean.
  ctrl.$isEmpty = function(value) {
    return value === false;
  };

  ctrl.$formatters.push(function(value) {
    return equals(value, trueValue);
  });

  ctrl.$parsers.push(function(value) {
    return value ? trueValue : falseValue;
  });
}