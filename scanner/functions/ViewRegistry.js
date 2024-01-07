constructor(atomEnvironment) {
    this.animationFrameRequest = null;
    this.documentReadInProgress = false;
    this.performDocumentUpdate = this.performDocumentUpdate.bind(this);
    this.atomEnvironment = atomEnvironment;
    this.clear();
  }