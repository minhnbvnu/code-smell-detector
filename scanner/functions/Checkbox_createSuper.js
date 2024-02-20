function Checkbox_createSuper(Derived) {
  var hasNativeReflectConstruct = Checkbox_isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = Checkbox_getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = Checkbox_getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return Checkbox_possibleConstructorReturn(this, result);
  };
}