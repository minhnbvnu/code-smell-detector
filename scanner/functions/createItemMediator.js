function createItemMediator({
  arr,
  mediator
}) {
  return function itemMediator(value, index) {
    // args: value, old value, index, array itself
    return mediator.call(arr, value, index, arr);
  };
}