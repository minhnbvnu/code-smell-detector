function isValidClass(componentClass) {
  return componentClass instanceof Function &&
         'componentConstructor' in componentClass &&
         componentClass.componentConstructor instanceof Function;
}