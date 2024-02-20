function peq2(propName) {
  return function (itemA, itemB) {
    return itemA[propName] === itemB[propName];
  };
}