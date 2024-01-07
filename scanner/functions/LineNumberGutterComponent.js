constructor(props) {
    this.props = props;
    this.element = this.props.element;
    this.virtualNode = $.div(null);
    this.virtualNode.domNode = this.element;
    this.nodePool = new NodePool();
    etch.updateSync(this);
  }