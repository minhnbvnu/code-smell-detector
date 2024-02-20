function removeObserver(observable, node) {
  observable.observers.delete(node);

  if (observable.observers.size === 0) {
    // deleting last observer
    queueForUnobservation(observable);
  }
}