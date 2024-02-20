function endPropertyChanges() {
  deferred--;
  if (deferred<=0) {
    beforeObserverSet.clear();
    observerSet.flush();
  }
}