function enableArrayObservation() {
  if (arrayObservationEnabled) {
    return;
  }

  arrayObservationEnabled = true;
  Observable.setArrayObserverFactory(collection => {
    return new ArrayObserver(collection);
  });
  const proto = Array.prototype; // Don't patch Array if it has already been patched
  // by another copy of fast-element.

  if (proto.$fastPatch) {
    return;
  }

  Reflect.defineProperty(proto, "$fastPatch", {
    value: 1,
    enumerable: false
  });
  const pop = proto.pop;
  const push = proto.push;
  const reverse = proto.reverse;
  const shift = proto.shift;
  const sort = proto.sort;
  const splice = proto.splice;
  const unshift = proto.unshift;

  proto.pop = function () {
    const notEmpty = this.length > 0;
    const methodCallResult = pop.apply(this, arguments);
    const o = this.$fastController;

    if (o !== void 0 && notEmpty) {
      o.addSplice(newSplice(this.length, [methodCallResult], 0));
    }

    return methodCallResult;
  };

  proto.push = function () {
    const methodCallResult = push.apply(this, arguments);
    const o = this.$fastController;

    if (o !== void 0) {
      o.addSplice(adjustIndex(newSplice(this.length - arguments.length, [], arguments.length), this));
    }

    return methodCallResult;
  };

  proto.reverse = function () {
    let oldArray;
    const o = this.$fastController;

    if (o !== void 0) {
      o.flush();
      oldArray = this.slice();
    }

    const methodCallResult = reverse.apply(this, arguments);

    if (o !== void 0) {
      o.reset(oldArray);
    }

    return methodCallResult;
  };

  proto.shift = function () {
    const notEmpty = this.length > 0;
    const methodCallResult = shift.apply(this, arguments);
    const o = this.$fastController;

    if (o !== void 0 && notEmpty) {
      o.addSplice(newSplice(0, [methodCallResult], 0));
    }

    return methodCallResult;
  };

  proto.sort = function () {
    let oldArray;
    const o = this.$fastController;

    if (o !== void 0) {
      o.flush();
      oldArray = this.slice();
    }

    const methodCallResult = sort.apply(this, arguments);

    if (o !== void 0) {
      o.reset(oldArray);
    }

    return methodCallResult;
  };

  proto.splice = function () {
    const methodCallResult = splice.apply(this, arguments);
    const o = this.$fastController;

    if (o !== void 0) {
      o.addSplice(adjustIndex(newSplice(+arguments[0], methodCallResult, arguments.length > 2 ? arguments.length - 2 : 0), this));
    }

    return methodCallResult;
  };

  proto.unshift = function () {
    const methodCallResult = unshift.apply(this, arguments);
    const o = this.$fastController;

    if (o !== void 0) {
      o.addSplice(adjustIndex(newSplice(0, [], arguments.length), this));
    }

    return methodCallResult;
  };
}