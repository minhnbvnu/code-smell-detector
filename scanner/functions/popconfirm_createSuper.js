function popconfirm_createSuper(Derived) {
  var hasNativeReflectConstruct = popconfirm_isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = popconfirm_getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = popconfirm_getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return popconfirm_possibleConstructorReturn(this, result);
  };
}