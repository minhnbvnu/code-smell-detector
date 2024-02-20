function onBeforeKeyDown(event){
    var instance = this;

    var ctrlDown = (event.ctrlKey || event.metaKey) && !event.altKey;

    if(ctrlDown){
      if (event.keyCode === 89 || (event.shiftKey && event.keyCode === 90)) { //CTRL + Y or CTRL + SHIFT + Z
        instance.undoRedo.redo();
        event.stopImmediatePropagation();
      }
      else if (event.keyCode === 90) { //CTRL + Z
        instance.undoRedo.undo();
        event.stopImmediatePropagation();
      }
    }
  }