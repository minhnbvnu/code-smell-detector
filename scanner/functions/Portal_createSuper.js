function Portal_createSuper(Derived) {
  var hasNativeReflectConstruct = Portal_isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = Portal_getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = Portal_getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return Portal_possibleConstructorReturn(this, result);
  };
}