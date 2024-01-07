constructor(originalPath, fileMode, recoveryPath) {
    this.originalPath = originalPath;
    this.fileMode = fileMode;
    this.recoveryPath = recoveryPath;
    this.refCount = 0;
  }