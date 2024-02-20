function ChatBotAuthorized(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    globalContextHelper.init(this.context().global);

    this.on('input', function(msg) {
      var chatContext = msg.chat();
      when(chatContext.get('authorized'))
        .then(function(authorized) {
          // check
          if (authorized === true) {
            node.send([msg, null]);
          } else {
            node.send([null, msg]);
          }
        });

    });
  }