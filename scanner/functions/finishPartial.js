function finishPartial(obj, m) {
  connectBindings(obj, m || Ember.meta(obj));
  return obj;
}