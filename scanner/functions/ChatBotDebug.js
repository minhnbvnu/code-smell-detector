function ChatBotDebug(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    globalContextHelper.init(this.context().global);
    this.chatId = config.chatId;

    this.on('input', function(msg) {

      if (_.isFunction(msg.chat)) {
        var chatContext = msg.chat();
        // get all keys
        when(chatContext.all())
          .then(function(obj) {
            // chat context
            lcd.node(obj, { title: 'ChatBot context', node: node });
            // message
            if (msg.payload != null) {
              lcd.node(msg.payload, {title: 'ChatBot message', node: node});
            }
          });
      } else {
        lcd.node(msg.payload, { title: 'Message debug', node: node });
      }
    });
  }