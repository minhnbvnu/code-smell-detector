function ChatBotContextStore(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    globalContextHelper.init(this.context().global);
    // just store the information
    node.contextStorage = config.contextStorage;
    node.contextParams = {};
    try {
      if (!_.isEmpty(config.contextParams)) {
        node.contextParams = JSON.parse(config.contextParams);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Invalid JSON in context storage params (' + this.name + ')');
    }
  }