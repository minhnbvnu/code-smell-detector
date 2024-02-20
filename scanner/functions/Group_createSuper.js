function Group_createSuper(Derived) {
  var hasNativeReflectConstruct = Group_isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = Group_getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = Group_getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return Group_possibleConstructorReturn(this, result);
  };
}