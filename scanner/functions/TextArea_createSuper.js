function TextArea_createSuper(Derived) {
  var hasNativeReflectConstruct = TextArea_isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = TextArea_getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = TextArea_getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return TextArea_possibleConstructorReturn(this, result);
  };
}