constructor() {
    super(...arguments);

    this.state = {
      value: this.props.defaultValue,
    };
  }