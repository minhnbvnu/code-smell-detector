function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (__WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_typeof___default()(objA) !== 'object' || objA === null || __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_typeof___default()(objB) !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  } // Test for A's keys different from B.


  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}