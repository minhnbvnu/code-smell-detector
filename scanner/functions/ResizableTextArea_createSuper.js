function ResizableTextArea_createSuper(Derived) {
  var hasNativeReflectConstruct = ResizableTextArea_isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = ResizableTextArea_getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = ResizableTextArea_getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return ResizableTextArea_possibleConstructorReturn(this, result);
  };
}