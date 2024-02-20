function ReduceComputedProperty(options) {
  var cp = this;

  this.options = options;
  this._instanceMetas = {};

  this._dependentKeys = null;
  // A map of dependentKey -> [itemProperty, ...] that tracks what properties of
  // items in the array we must track to update this property.
  this._itemPropertyKeys = {};
  this._previousItemPropertyKeys = {};

  this.readOnly();
  this.cacheable();

  this.recomputeOnce = function(propertyName) {
    // What we really want to do is coalesce by <cp, propertyName>.
    // We need a form of `scheduleOnce` that accepts an arbitrary token to
    // coalesce by, in addition to the target and method.
    Ember.run.once(this, recompute, propertyName);
  };
  var recompute = function(propertyName) {
    var dependentKeys = cp._dependentKeys,
        meta = cp._instanceMeta(this, propertyName),
        callbacks = cp._callbacks();

    reset.call(this, cp, propertyName);

    forEach(cp._dependentKeys, function (dependentKey) {
      var dependentArray = get(this, dependentKey),
          previousDependentArray = meta.dependentArrays[dependentKey];

      if (dependentArray === previousDependentArray) {
        // The array may be the same, but our item property keys may have
        // changed, so we set them up again.  We can't easily tell if they've
        // changed: the array may be the same object, but with different
        // contents.
        if (cp._previousItemPropertyKeys[dependentKey]) {
          delete cp._previousItemPropertyKeys[dependentKey];
          meta.dependentArraysObserver.setupPropertyObservers(dependentKey, cp._itemPropertyKeys[dependentKey]);
        }
      } else {
        meta.dependentArrays[dependentKey] = dependentArray;

        if (previousDependentArray) {
          meta.dependentArraysObserver.teardownObservers(previousDependentArray, dependentKey);
        }

        if (dependentArray) {
          meta.dependentArraysObserver.setupObservers(dependentArray, dependentKey);
        }
      }
    }, this);

    forEach(cp._dependentKeys, function(dependentKey) {
      var dependentArray = get(this, dependentKey);
      if (dependentArray) {
        addItems.call(this, dependentArray, callbacks, cp, propertyName, meta);
      }
    }, this);
  };

  this.func = function (propertyName) {
    Ember.assert("Computed reduce values require at least one dependent key", cp._dependentKeys);

    recompute.call(this, propertyName);

    return cp._instanceMeta(this, propertyName).getValue();
  };
}