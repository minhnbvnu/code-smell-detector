function singletonClass(obj) {
  var singleton = obj.__proto__;
  if (!singleton.__singleton__) {
    singleton = {};
    Object.defineProperty(singleton, {__singleton__: {value: true}});
    singleton.__proto__ = obj.__proto__;
    obj.__proto__ = singleton;
  }
  return singleton;
}