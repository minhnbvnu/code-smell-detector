constructor(props) {
    this.props = props;
    etch.initialize(this);
    this.createLines();
    this.updateBlockDecorations({}, props);
  }