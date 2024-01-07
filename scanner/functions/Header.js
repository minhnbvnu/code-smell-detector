constructor(props, context) {
    super(props, context);
    const query = parse(window.location.search);
    const version = query.version || 'local';
    const production = query.production || false;
    const versions = [version];

    this.state = {version, versions, production};
  }