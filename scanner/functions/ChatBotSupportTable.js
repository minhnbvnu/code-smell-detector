function ChatBotSupportTable(config) {
    RED.nodes.createNode(this, config);
    globalContextHelper.init(this.context().global);
    this.on('input', function() {
      ChatExpress.showCompatibilityChart();
    });
  }