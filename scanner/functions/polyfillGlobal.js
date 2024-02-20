function polyfillGlobal(name, newValue, scope = GLOBAL) {
  var descriptor = Object.getOwnPropertyDescriptor(scope, name) || {
    // jest for some bad reasons runs the polyfill code multiple times. In jest
    // environment, XmlHttpRequest doesn't exist so getOwnPropertyDescriptor
    // returns undefined and defineProperty default for writable is false.
    // Therefore, the second time it runs, defineProperty will fatal :(
    writable: true,
  };

  if (scope[name] !== undefined) {
    var backupName = `original${name[0].toUpperCase()}${name.substr(1)}`;
    Object.defineProperty(scope, backupName, {...descriptor, value: scope[name]});
  }

  Object.defineProperty(scope, name, {...descriptor, value: newValue});
}