function registerComponent(container, name) {
  Ember.assert("You provided a template named 'components/" + name + "', but custom components must include a '-'", name.match(/-/));

  container.injection('component:' + name, 'layout', 'template:components/' + name);

  var fullName = 'component:' + name;
  var Component = container.lookupFactory(fullName);

  if (!Component) {
    container.register('component:' + name, Ember.Component);
    Component = container.lookupFactory(fullName);
  }

  Ember.Handlebars.helper(name, Component);
}