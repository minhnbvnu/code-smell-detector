constructor() {
    this.emitter = new Emitter();
    this.currentVersion = atom.getVersion();
    this.availableVersion = atom.getVersion();
    this.resetState();
    this.listenForAtomEvents();
  }