function __combineKey({ atomClass, atomStage }) {
    return `${atomClass.module}:${atomClass.atomClassName}:${atomStage}`;
  }