function MicrosoftTeamsOutNode(config) {
    RED.nodes.createNode(this, config);
    globalContextHelper.init(this.context().global);

    var node = this;
    var environment = getEnvironment();

    this.bot = config.bot;
    this.botProduction = config.botProduction;
    this.track = config.track;
    this.passThrough = config.passThrough;
    this.config = RED.nodes.getNode(environment === 'production' ? this.botProduction : this.bot);

    if (this.config) {
      this.status({fill: 'red', shape: 'ring', text: 'disconnected'});
      node.chat = this.config.chat;
      if (node.chat) {
        this.status({fill: 'green', shape: 'ring', text: 'connected'});
      } else {
        node.warn('Missing or incomplete configuration in Microsoft Teams Receiver');
      }
    } else {
      node.warn('Missing configuration in Microsoft Teams Receiver');
    }

    // relay message
    var handler = function(msg) {
      node.send(msg);
    };
    RED.events.on('node:' + config.id, handler);

    // cleanup on close
    this.on('close',function() {
      RED.events.removeListener('node:' + config.id, handler);
    });

    this.on('input', function (message) {
      var context = message.chat();
      var stack = when(true);
      // check if this node has some wirings in the follow up pin, in that case
      // the next message should be redirected here
      if (context != null && node.track && !_.isEmpty(node.wires[0])) {
        stack = stack.then(function() {
          return when(context.set({
            currentConversationNode: node.id,
            currentConversationNode_at: moment()
          }));
        });
      }
      // finally send out
      stack.then(function() {
        return node.chat.send(message);
      }).then(function() {
        // forward if not tracking
        if (node.passThrough) {
          node.send(message);
        }
      });
    });
  }