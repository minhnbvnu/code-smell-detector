function isComponent (componentName) {
  if (componentName.indexOf(MULTIPLE_COMPONENT_DELIMITER) !== -1) {
    componentName = utils.split(componentName, MULTIPLE_COMPONENT_DELIMITER)[0];
  }
  if (!COMPONENTS[componentName]) { return false; }
  return true;
}