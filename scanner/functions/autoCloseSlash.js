function autoCloseSlash(cm) {
    if (cm.getOption("disableInput")) return CodeMirror.Pass;
    return autoCloseCurrent(cm, true);
  }