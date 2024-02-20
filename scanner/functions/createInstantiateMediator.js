function createInstantiateMediator({
  UsedClass,
  updateFunction
}) {
  return function mediator(value, previousValue, key, object) {
    if (previousValue instanceof UsedClass) {
      updateFunction.call(object, previousValue, value, key);
      return previousValue;
    }

    return new UsedClass(value, object, key);
  };
}