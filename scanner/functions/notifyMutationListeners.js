function notifyMutationListeners() {
  Ember.run.once(Ember.View, 'notifyMutationListeners');
}