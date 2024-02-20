function wave_createSuper(Derived) {
  var hasNativeReflectConstruct = wave_isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = wave_getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = wave_getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return wave_possibleConstructorReturn(this, result);
  };
}