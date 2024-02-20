function Input_createSuper(Derived) {
  var hasNativeReflectConstruct = Input_isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = Input_getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = Input_getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return Input_possibleConstructorReturn(this, result);
  };
}