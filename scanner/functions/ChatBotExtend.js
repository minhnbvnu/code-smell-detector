function ChatBotExtend(config) {
    RED.nodes.createNode(this, config);
    globalContextHelper.init(this.context().global);
    this.codeJs = config.codeJs;
  }