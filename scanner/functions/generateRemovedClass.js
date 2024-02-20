function generateRemovedClass(className) {
  var msg = " has been moved into a plugin: https://github.com/emberjs/ember-states";

  return {
    extend: throwWithMessage(className + msg),
    create: throwWithMessage(className + msg)
  };
}