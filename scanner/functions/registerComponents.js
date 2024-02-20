function registerComponents(container) {
  var templates = Ember.TEMPLATES, match;
  if (!templates) { return; }

  for (var prop in templates) {
    if (match = prop.match(/^components\/(.*)$/)) {
      registerComponent(container, match[1]);
    }
  }
}