function ChatBotQuickReplies(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    globalContextHelper.init(this.context().global);
    this.buttons = config.buttons;
    this.message = config.message;
    this.trackMessage = config.trackMessage;

    this.relay = function(msg) {
      // copy msg in the right position
      const toSend = node.buttons.map(({ value }) => msg.payload?.content === value ? msg : null);
      // first pin is alway to sender
      toSend.unshift(null);
      node.send(toSend);
    }

    this.on('input', function(msg, send, done) {
      // send/done compatibility for node-red < 1.0
      send = send || function() { node.send.apply(node, arguments) };
      done = done || function(error) { node.error.call(node, error, msg) };
      // check if valid message
      if (!isValidMessage(msg, node)) {
        done('Invalid input message');
        return;
      }
      // get RedBot values
      const chatId = getChatId(msg);
      const messageId = getMessageId(msg);
      const template = MessageTemplate(msg, node);
      const transport = getTransport(msg);
      // check transport compatibility
      if (!ChatExpress.isSupported(transport, 'quick-replies')) {
        done(`Node "quick-replies" is not supported by ${transport} transport`);
        return;
      }
      // get values from config
      // prepare the message, first the config, then payload
      const buttons = extractValue('buttons', 'buttons', node, msg);
      const message = extractValue('string', 'message', node, msg);

      template(message, buttons)
        .then(([translatedMessage, translatedButtons]) => {
          send({
            ...msg,
            payload: {
              type: 'quick-replies',
              content: message != null ? emoji.emojify(translatedMessage) : null,
              chatId: chatId,
              messageId: messageId,
              buttons: translatedButtons,
              trackNodeId: node.trackMessage ? node._path : undefined
            }
          });
          done();
        });
    });
  }