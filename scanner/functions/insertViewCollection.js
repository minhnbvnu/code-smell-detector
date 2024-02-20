function insertViewCollection(view, viewCollection, previous, buffer) {
  viewCollection.triggerRecursively('willInsertElement');

  if (previous) {
    previous.domManager.after(previous, buffer.string());
  } else {
    view.domManager.prepend(view, buffer.string());
  }

  viewCollection.forEach(function(v) {
    v.transitionTo('inDOM');
    v.propertyDidChange('element');
    v.triggerRecursively('didInsertElement');
  });
}