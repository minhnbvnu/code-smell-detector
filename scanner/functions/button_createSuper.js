function button_createSuper(Derived) {
  var hasNativeReflectConstruct = button_isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = button_getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = button_getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return button_possibleConstructorReturn(this, result);
  };
}