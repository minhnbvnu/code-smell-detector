function collectComponent(component) {
  var name = component.constructor.name;
  (components[name] || (components[name] = [])).push(component);
}