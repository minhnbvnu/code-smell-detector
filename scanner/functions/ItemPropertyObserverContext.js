function ItemPropertyObserverContext (dependentArray, index, trackedArray) {
  Ember.assert("Internal error: trackedArray is null or undefined", trackedArray);

  this.dependentArray = dependentArray;
  this.index = index;
  this.item = dependentArray.objectAt(index);
  this.trackedArray = trackedArray;
  this.beforeObserver = null;
  this.observer = null;
}