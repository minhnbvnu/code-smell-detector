function exposeOverrideable(FromClass, fromMethod, fromTransform, ToClass, toMethod, toTransform) {
  // Wrapper function needed to "capture" the current version of fromMethod
  let wrapper = (fn => {
    return function () {
      return fn.apply(toTransform(this), arguments);
    };
  })(FromClass.prototype[fromMethod]);

  Object.defineProperty(ToClass.prototype, toMethod, {
    get() { return wrapper; },
    set(overrideFn) {
      // overrideFn expects `this` to be ToClass, so ensure as such
      // But we can also call this method from FromClass; need to ensure
      // it's always called with a ToClass
      FromClass.prototype[fromMethod] = function () {
        const newThis = this instanceof FromClass ? fromTransform(this) : this;
        return overrideFn.apply(newThis, arguments);
      };
      wrapper = overrideFn;
    }
  });
}