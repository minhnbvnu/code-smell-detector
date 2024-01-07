constructor(props) {
    this.props = props;
    etch.initialize(this);
    if (this.props.flashRequested) this.performFlash();
  }