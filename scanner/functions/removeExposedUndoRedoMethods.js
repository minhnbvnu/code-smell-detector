function removeExposedUndoRedoMethods(instance){
    delete instance.undo;
    delete instance.redo;
    delete instance.isUndoAvailable;
    delete instance.isRedoAvailable;
    delete instance.clearUndo;
  }