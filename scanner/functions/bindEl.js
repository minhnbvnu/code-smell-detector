function bindEl(el) {
  var $el = $(el);
  Object.keys(bindings).forEach(function (className) {
    if ($el.hasClass(className) && !$el.hasClass("crosstalk-input-bound")) {
      var binding = bindings[className];
      bindInstance(binding, el);
    }
  });
}