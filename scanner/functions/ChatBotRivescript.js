function ChatBotRivescript(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    globalContextHelper.init(this.context().global);
    this.script = config.script;
    this.debug = config.debug;
    this.scriptFile = config.scriptFile;
    this.parse_mode = config.parse_mode;
    this.transports = ['telegram', 'slack', 'facebook', 'smooch'];

    this.on('close', done => {
      const context = node.context();
      // clear the instance of rivebot
      context.set('rivebot', null);
      node.status({});
      done();
    });

    this.on('input', msg => {
      const chatId = getChatId(msg);
      const context = node.context();
      const chatContext = msg.chat();

      // exit if payload content is not string
      const content = extractValue('string', 'content', node, msg, false);
      const script = extractValue('string', 'script', node, msg, false);
      const scriptFile = extractValue('string', 'scriptFile', node, msg, false);
      const debug = extractValue('boolean', 'debug', node, msg, false);

      // skip if command
      if (_.isEmpty(content) || helpers.isCommand(content)) {
        node.send([null, msg]);
        return;
      }

      // create and cache the rivescript bot for this node, on deploy it will be reloaded
      getOrCreateBot({ script, scriptFile, context, debug })
        .then(bot => {
          // rivescript bot initialized
          when(chatContext != null ? chatContext.all() : {})
            .then(variables => {
              // anything that is not string printable
              const printableVariables = _(variables).mapObject(value => {
                return _.isString(value) || _.isNumber(value) || _.isArray(value) ? value : null;
              });
              bot.setUservars(chatId, printableVariables);
              // set topic if any
              if (!_.isEmpty(variables.topic)) {
                bot.setUservar(chatId, 'topic', variables.topic);
              } else {
                bot.setUservar(chatId, 'topic', 'random');
              }
              // get a reply
              return bot.reply(chatId, content);
            })
            .then(reply => {
              if (reply.match(/^ERR:/)) {
                // pass thru
                return Promise.reject(false);
              }
              // set the vars back
              return Promise.all([reply, bot.getUservars(chatId)]);
            })
            .then(([reply, replyVars]) => {
              const variablesToPutBack = _(replyVars).omit('topic', '__initialmatch__', '__history__', '__lastmatch__', '__last_triggers__');
              // set back the intent (topic in RiveScript)
              if (!_.isEmpty(replyVars.topic) && replyVars.topic !== 'random') {
                variablesToPutBack.topic = replyVars.topic;
              }
              // set back
              return Promise.all([reply, when(chatContext.set(variablesToPutBack))]);
            })
            .then(([reply]) => {
              // payload
              msg.payload = reply;
              // send out reply
              node.send([msg, null]);
            })
            .catch(error => {
              if (error instanceof Error) {
                lcd.dump(error, 'Runtime error in Rivescript');
              } else {
                // pass thru
                node.send([null, msg]);
              }
            });
        })
        .catch(error => {
          lcd.dump(error, 'Error creating Rivescript bot');
        })
    });
  }