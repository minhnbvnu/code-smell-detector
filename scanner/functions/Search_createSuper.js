function Search_createSuper(Derived) {
  var hasNativeReflectConstruct = Search_isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = Search_getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = Search_getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return Search_possibleConstructorReturn(this, result);
  };
}