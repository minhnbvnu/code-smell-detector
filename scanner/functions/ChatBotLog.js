function ChatBotLog(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    globalContextHelper.init(this.context().global);

    this.on('input', function(msg) {

      var task = when(true);
      var chatContext = msg.chat();

      if (chatContext != null) {
        task = task.then(function() {
          return chatContext.get('firstName', 'lastName', 'chatId');
        });
      }

      when(task)
        .then(function(jsonContext) {
          var chatLog = new ChatLog(jsonContext);
          msg.payload = chatLog.message(msg);
          node.send(msg);
        });
    });
  }