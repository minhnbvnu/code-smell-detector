constructor(version, autoUpdateManager) {
    this.version = version;
    this.autoUpdateManager = autoUpdateManager;
    this.windowTemplates = new WeakMap();
    this.setActiveTemplate(this.getDefaultTemplate());
    this.autoUpdateManager.on('state-changed', state =>
      this.showUpdateMenuItem(state)
    );
  }