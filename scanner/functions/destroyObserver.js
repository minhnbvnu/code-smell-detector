function destroyObserver(){
    var instance = this;

    jsonpatch.unobserve(instance.getData(), instance.observer);
    delete instance.observeChangesActive;
    delete instance.pauseObservingChanges;
    delete instance.resumeObservingChanges;
  }