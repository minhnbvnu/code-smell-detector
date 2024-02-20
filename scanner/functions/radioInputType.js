function radioInputType(scope, element, attr, ctrl) {
  // make the name unique, if not defined
  if (isUndefined(attr.name)) {
    element.attr('name', nextUid());
  }

  var listener = function(ev) {
    if (element[0].checked) {
      ctrl.$setViewValue(attr.value, ev && ev.type);
    }
  };

  element.on('click', listener);

  ctrl.$render = function() {
    var value = attr.value;
    element[0].checked = (value == ctrl.$viewValue);
  };

  attr.$observe('value', ctrl.$render);
}