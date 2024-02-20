function onAfterChange(changes, source){
    var instance = this;
    if (source == 'loadData'){
      return instance.undoRedo.clear();
    }
  }