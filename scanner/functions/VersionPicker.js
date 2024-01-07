constructor(props, context) {
    super(props, context);
    const version = props.version || 'local';
    const versions = [version];
    this.state = {versions};
  }