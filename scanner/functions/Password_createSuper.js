function Password_createSuper(Derived) {
  var hasNativeReflectConstruct = Password_isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = Password_getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = Password_getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return Password_possibleConstructorReturn(this, result);
  };
}