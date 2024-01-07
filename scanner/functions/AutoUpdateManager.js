constructor(version, testMode, config) {
    super();
    this.onUpdateNotAvailable = this.onUpdateNotAvailable.bind(this);
    this.onUpdateError = this.onUpdateError.bind(this);
    this.version = version;
    this.testMode = testMode;
    this.config = config;
    this.state = IdleState;
    this.iconPath = path.resolve(
      __dirname,
      '..',
      '..',
      'resources',
      'atom.png'
    );
    this.updateUrlPrefix =
      process.env.ATOM_UPDATE_URL_PREFIX || 'https://atom.io';
  }