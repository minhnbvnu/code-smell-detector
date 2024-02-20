function stringBasedInputType(ctrl) {
  ctrl.$formatters.push(function(value) {
    return ctrl.$isEmpty(value) ? value : value.toString();
  });
}