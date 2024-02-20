function ArrayComputedProperty() {
  var cp = this;

  ReduceComputedProperty.apply(this, arguments);

  this.func = (function(reduceFunc) {
    return function (propertyName) {
      if (!cp._hasInstanceMeta(this, propertyName)) {
        // When we recompute an array computed property, we need already
        // retrieved arrays to be updated; we can't simply empty the cache and
        // hope the array is re-retrieved.
        forEach(cp._dependentKeys, function(dependentKey) {
          Ember.addObserver(this, dependentKey, function() {
            cp.recomputeOnce.call(this, propertyName);
          });
        }, this);
      }

      return reduceFunc.apply(this, arguments);
    };
  })(this.func);

  return this;
}