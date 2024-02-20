function createMediator({
  object,
  propDef,
  key,
  mediator
}) {
  return function propMediator(value) {
    // args: value, previousValue, key, object itself
    return mediator.call(object, value, propDef.value, key, object);
  };
}