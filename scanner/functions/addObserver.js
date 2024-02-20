function addObserver(observable, node) {
  observable.observers.add(node);

  if (observable.lowestObserverState > node.dependenciesState) {
    observable.lowestObserverState = node.dependenciesState;
  }
}