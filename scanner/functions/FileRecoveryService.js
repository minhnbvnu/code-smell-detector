constructor(recoveryDirectory) {
    this.recoveryDirectory = recoveryDirectory;
    this.recoveryFilesByFilePath = new Map();
    this.recoveryFilesByWindow = new WeakMap();
    this.windowsByRecoveryFile = new Map();
  }