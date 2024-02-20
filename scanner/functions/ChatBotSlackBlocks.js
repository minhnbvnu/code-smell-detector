function ChatBotSlackBlocks(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    globalContextHelper.init(this.context().global);
    this.blocks = config.blocks;

    this.on('input', async function(msg, send, done) {
      // send/done compatibility for node-red < 1.0
      send = send || function() { node.send.apply(node, arguments) };
      done = done || function(error) { node.error.call(node, error, msg) };
      // check if valid message
      if (!isValidMessage(msg, node)) {
        return;
      }
      const chatId = getChatId(msg);
      const messageId = getMessageId(msg);
      const template = MessageTemplate(msg, node);
      const transport = getTransport(msg);
      // check transport compatibility
      if (!ChatExpress.isSupported(transport, 'blocks')) {
        done(`Node "blocks" is not supported by ${transport} transport`);
        return;
      }
      // extract vars
      let blocks = extractValue('string', 'blocks', node, msg);
      // parse blocks
      let rawBlocks;
      try {
        rawBlocks = JSON.parse(blocks);
      } catch(e) {
        done(e);
        return;
      }

      const renderedBlocks = await template(rawBlocks)

      send({
        ...msg,
        payload: {
          type: 'blocks',
          text: _.isString(renderedBlocks.text) ? renderedBlocks.text : undefined,
          content: _.isObject(renderedBlocks) && renderedBlocks.blocks != null ? renderedBlocks.blocks : renderedBlocks,
          chatId: chatId,
          messageId: messageId,
          inbound: false
        }
      });
      done();
    });
  }