function afterTableAlter(){
    var instance = this;

    instance.pauseObservingChanges();

    instance.addHookOnce('afterChangesObserved', function(){
      instance.resumeObservingChanges();
    });

  }