function MicrosoftTeamsInNode(config) {
    RED.nodes.createNode(this, config);
    globalContextHelper.init(this.context().global);

    var node = this;
    var environment = getEnvironment();
    var nodeGlobalKey = null;

    this.bot = config.bot;
    this.botProduction = config.botProduction;
    //console.log('--- prod', this.botProduction , )
    //console.log('--- bot', this.bot)
    this.config = RED.nodes.getNode(environment === 'production' ? this.botProduction : this.bot);
    //console.log('--- config', this.config)
    if (this.config) {
      this.status({fill: 'red', shape: 'ring', text: 'disconnected'});
      node.chat = this.config.chat;
      if (node.chat) {
        this.status({fill: 'green', shape: 'ring', text: 'connected'});
        nodeGlobalKey = 'msteams_master_' + this.config.id.replace('.','_');
        var isMaster = false;
        if (globalContextHelper.get(nodeGlobalKey) == null) {
          isMaster = true;
          globalContextHelper.set(nodeGlobalKey, node.id);
        }
        node.chat.on('message', function (message) {
          var context = message.chat();
          // check if there is a conversation is going on
          when(context.get('currentConversationNode'))
            .then(function(currentConversationNode) {
              // if there's a current converation, then the message must be forwarded
              if (currentConversationNode != null) {
                // if the current node is master, then redirect, if not master do nothing
                if (isMaster) {
                  when(context.remove('currentConversationNode'))
                    .then(function () {
                      // emit message directly the node where the conversation stopped
                      RED.events.emit('node:' + currentConversationNode, message);
                    });
                }
              } else {
                node.send(message);
              }
            });
        });
      } else {
        node.warn('Missing or incomplete configuration in Microsoft Teams Receiver');
      }
    } else {
      node.warn('Missing configuration in Microsoft Teams Receiver');
    }

    this.on('close', function (done) {
      globalContextHelper.set(nodeGlobalKey, null);
      if (node.chat != null) {
        node.chat.off('message');
      }
      done();
    });
  }