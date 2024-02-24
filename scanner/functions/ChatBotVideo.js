function ChatBotVideo(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    globalContextHelper.init(this.context().global);
    this.filename = config.filename;
    this.video = config.video;
    this.name = config.name;
    this.caption = config.caption;

    this.on('input', function(msg, send, done) {
      // send/done compatibility for node-red < 1.0
      send = send || function() { node.send.apply(node, arguments) };
      done = done || function(error) { node.error.call(node, error, msg) };

      const chatId = getChatId(msg);
      const messageId = getMessageId(msg);
      const transport = getTransport(msg);
      const template = MessageTemplate(msg, node);

      // check if valid message
      if (!isValidMessage(msg, node)) {
        return;
      }
      // check transport compatibility
      if (!ChatExpress.isSupported(transport, 'video')) {
        return;
      }

      let content = extractValue('filepath', 'video', node, msg)
        || extractValue('url', 'video', node, msg)
        || extractValue('buffer', 'video', node, msg)
        || extractValue('stringWithVariables', 'video', node, msg)
        || extractValue('filepath',  'filename', node, msg, false, true, false); // no payload, yes message
      let caption = extractValue('string', 'caption', node, msg, false);

      template({ content, caption })
        .then(({ content, caption }) => {
          // get the content
          let fetcher = null;
          if (validators.filepath(content)) {
            fetcher = fetchers.file;
          } else if (validators.url(content)) {
            fetcher = fetchers.url;
          } else if (validators.buffer(content)) {
            fetcher = fetchers.identity;
          } else if (_.isString(content) && content.length > 4064) {
            done('Looks like you are passing a very long string (> 4064 bytes) in the payload as video url or path\n'
              + 'Perhaps you are using a "Http request" and passing the result as string instead of buffer?');
            return;
          } else {
            done('Don\'t know how to handle: ' + content);
            return;
          }

          fetcher(content)
            .then(file => enrichFilePayload(file, msg, node))
            .then(file => {
              // check if a valid file
              const error = ChatExpress.isValidFile(transport, 'video', file);
              if (error != null) {
                done(error);
                throw error;
              }
              return file;
            })
            .then(
              file => {
                // send out reply
                node.send({
                  ...msg,
                  payload: {
                    type: 'video',
                    content: file.buffer,
                    mimeType: file.mimeType,
                    caption,
                    filename: file.filename,
                    chatId: chatId,
                    messageId: messageId,
                    inbound: false
                  }
                });
              },
              e => done(e)
            );
        });
    });
  }