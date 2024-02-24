function createBound(func, bitmask, partialArgs, partialRightArgs, thisArg, arity) {
  var isBind = bitmask & 1,
      isBindKey = bitmask & 2,
      isCurry = bitmask & 4,
      isCurryBound = bitmask & 8,
      isPartial = bitmask & 16,
      isPartialRight = bitmask & 32,
      key = func;

  if (!isBindKey && !isFunction(func)) {
    throw new TypeError;
  }
  if (isPartial && !partialArgs.length) {
    bitmask &= ~16;
    isPartial = partialArgs = false;
  }
  if (isPartialRight && !partialRightArgs.length) {
    bitmask &= ~32;
    isPartialRight = partialRightArgs = false;
  }
  var bindData = func && func.__bindData__;
  if (bindData) {
    if (isBind && !(bindData[1] & 1)) {
      bindData[4] = thisArg;
    }
    if (!isBind && bindData[1] & 1) {
      bitmask |= 8;
    }
    if (isCurry && !(bindData[1] & 4)) {
      bindData[5] = arity;
    }
    if (isPartial) {
      push.apply(bindData[2] || (bindData[2] = []), partialArgs);
    }
    if (isPartialRight) {
      push.apply(bindData[3] || (bindData[3] = []), partialRightArgs);
    }
    bindData[1] |= bitmask;
    return createBound.apply(null, bindData);
  }
  // use `Function#bind` if it exists and is fast
  // (in V8 `Function#bind` is slower except when partially applied)
  if (isBind && !(isBindKey || isCurry || isPartialRight) &&
      (support.fastBind || (nativeBind && isPartial))) {
    if (isPartial) {
      var args = [thisArg];
      push.apply(args, partialArgs);
    }
    var bound = isPartial
      ? nativeBind.apply(func, args)
      : nativeBind.call(func, thisArg);
  }
  else {
    bound = function() {
      // `Function#bind` spec
      // http://es5.github.io/#x15.3.4.5
      var args = arguments,
          thisBinding = isBind ? thisArg : this;

      if (isCurry || isPartial || isPartialRight) {
        args = nativeSlice.call(args);
        if (isPartial) {
          unshift.apply(args, partialArgs);
        }
        if (isPartialRight) {
          push.apply(args, partialRightArgs);
        }
        if (isCurry && args.length < arity) {
          bitmask |= 16 & ~32;
          return createBound(func, (isCurryBound ? bitmask : bitmask & ~3), args, null, thisArg, arity);
        }
      }
      if (isBindKey) {
        func = thisBinding[key];
      }
      if (this instanceof bound) {
        // ensure `new bound` is an instance of `func`
        thisBinding = createObject(func.prototype);

        // mimic the constructor's `return` behavior
        // http://es5.github.io/#x13.2.2
        var result = func.apply(thisBinding, args);
        return isObject(result) ? result : thisBinding;
      }
      return func.apply(thisBinding, args);
    };
  }
  setBindData(bound, nativeSlice.call(arguments));
  return bound;
}