function UniversalBotNode(n) {
    RED.nodes.createNode(this, n);
    globalContextHelper.init(this.context().global);

    var node = this;
    var environment = getEnvironment();
    var isUsed = utils.isUsed(RED, node.id);
    var startNode = utils.isUsedInEnvironment(RED, node.id, environment);
    var universalConfigs = globalContextHelper.get('universal') || {};

    this.botname = n.botname;
    this.store = n.store;
    this.log = n.log;
    this.connectorParams = n.connectorParams;
    this.usernames = n.usernames != null ? n.usernames.split(',') : [];
    this.polling = n.polling;
    this.providerToken = n.providerToken;
    this.debug = n.debug;

    if (!isUsed) {
      // silently exit, this node is not used
      return;
    }
    // exit if the node is not meant to be started in this environment
    if (!startNode) {
      // eslint-disable-next-line no-console
      console.log(lcd.timestamp() + warn('Universal Connector Bot ' + this.botname + ' will NOT be launched, environment is ' + environment));
      return;
    }
    // eslint-disable-next-line no-console
    console.log(green(lcd.timestamp() + 'Universal Connector Bot ' + this.botname + ' will be launched, environment is ' + environment));
    // get the context storage node
    var contextStorageNode = RED.nodes.getNode(this.store);
    // parse JSON config
    var connectorParams = null;
    if (!_.isEmpty(this.connectorParams))
    {
      try {
        connectorParams = JSON.parse(this.connectorParams);
      } catch (error) {
        lcd.dump(error, 'Error in JSON configuration of Universal Connector');
        // eslint-disable-next-line no-console
        console.log(lcd.red(this.connectorParams));
        // eslint-disable-next-line no-console
        console.log('');
        return;
      }
    }
    // build the configuration object
    var botConfiguration = {
      authorizedUsernames: node.usernames,
      logfile: node.log,
      contextProvider: contextStorageNode != null ? contextStorageNode.contextStorage : null,
      contextParams: contextStorageNode != null ? contextStorageNode.contextParams : null,
      debug: node.debug,
      connectorParams: connectorParams
    };
    // check if there's a valid configuration in global settings
    if (universalConfigs[node.botname] != null) {
      var validation = validators.platform.universal(universalConfigs[node.botname]);
      if (validation != null) {
        /* eslint-disable no-console */
        console.log('');
        console.log(lcd.error('Found a Universal Connector configuration in settings.js "' + node.botname + '", but it\'s invalid.'));
        console.log(lcd.grey('Errors:'));
        console.log(prettyjson.render(validation));
        console.log('');
        return;
      } else {
        console.log('');
        console.log(lcd.grey('Found a valid Universal Connector configuration in settings.js: "' + node.botname + '":'));
        console.log(prettyjson.render(universalConfigs[node.botname]));
        console.log('');
        /* eslint-enable no-console */
        botConfiguration = universalConfigs[node.botname];
      }
    }
    // check if context node
    if (botConfiguration.contextProvider == null) {
      // eslint-disable-next-line no-console
      console.log(lcd.warn('No context provider specified for chatbot ' + node.botname + '. Defaulting to "memory"'));
      botConfiguration.contextProvider = 'memory';
      botConfiguration.contextParams = {};
    }
    // if chat is not already there and there's a token
    if (node.chat == null) {
      // check if provider exisst
      if (!contextProviders.hasProvider(botConfiguration.contextProvider)) {
        node.error('Error creating chatbot ' + this.botname + '. The context provider '
          + botConfiguration.contextProvider + ' doesn\'t exist.');
        return;
      }
      // create a factory for the context provider
      node.contextProvider = contextProviders.getProvider(
        botConfiguration.contextProvider,
        { ...botConfiguration.contextParams, id: this.store }
      );
      // try to start the servers
      try {
        node.contextProvider.start();
        node.chat = UniversalServer.createServer(_.extend(
          {
            authorizedUsernames: botConfiguration.authorizedUsernames,
            contextProvider: node.contextProvider,
            logfile: botConfiguration.logfile,
            debug: botConfiguration.debug,
            RED: RED
          },
          botConfiguration.connectorParams
        ));
        // add extensions
        RED.nodes.eachNode(function(currentNode) {
          if (currentNode.type === 'chatbot-extend' && !_.isEmpty(currentNode.codeJs)
            && currentNode.platform === 'universal') {
            try {
              eval(currentNode.codeJs);
            } catch (e) {
              lcd.node(currentNode.codeJs, {
                color: lcd.red,
                node: currentNode,
                title: 'Syntax error in Extend Chat Server node'
              });
            }
          }
        });
        // finally launch it
        node.chat.start();
        // handle error on sl6teack chat server
        node.chat.on('error', function(error) {
          node.error(error);
        });
        node.chat.on('warning', function(warning) {
          node.warn(warning);
        });
      } catch(e) {
        node.error(e);
      }
    }

    this.on('close', function (done) {
      node.chat.stop()
        .then(function() {
          return node.contextProvider.stop();
        })
        .then(function() {
          node.chat = null;
          node.contextProvider = null;
          ChatExpress.reset();
          ContextProviders.reset();
          done();
        });
    });
  }