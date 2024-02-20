function switch_createSuper(Derived) {
  var hasNativeReflectConstruct = switch_isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = switch_getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = switch_getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return switch_possibleConstructorReturn(this, result);
  };
}