function DialogflowToken(n) {
    RED.nodes.createNode(this, n);
    globalContextHelper.init(this.context().global);
  }