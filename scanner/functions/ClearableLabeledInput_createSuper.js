function ClearableLabeledInput_createSuper(Derived) {
  var hasNativeReflectConstruct = ClearableLabeledInput_isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = ClearableLabeledInput_getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = ClearableLabeledInput_getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return ClearableLabeledInput_possibleConstructorReturn(this, result);
  };
}