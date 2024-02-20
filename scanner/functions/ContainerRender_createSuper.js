function ContainerRender_createSuper(Derived) {
  var hasNativeReflectConstruct = ContainerRender_isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = ContainerRender_getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = ContainerRender_getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return ContainerRender_possibleConstructorReturn(this, result);
  };
}