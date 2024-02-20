function tooltip_createSuper(Derived) {
  var hasNativeReflectConstruct = tooltip_isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = tooltip_getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = tooltip_getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return tooltip_possibleConstructorReturn(this, result);
  };
}