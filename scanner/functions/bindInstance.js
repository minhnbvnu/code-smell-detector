function bindInstance(binding, el) {
  var jsonEl = $(el).find("script[type='application/json'][data-for='" + $escape(el.id) + "']");
  var data = JSON.parse(jsonEl[0].innerText);

  var instance = binding.factory(el, data);
  $(el).data("crosstalk-instance", instance);
  $(el).addClass("crosstalk-input-bound");
}