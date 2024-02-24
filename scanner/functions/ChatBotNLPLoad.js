function ChatBotNLPLoad(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    globalContextHelper.init(this.context().global);
    this.filename = config.filename;

    this.on('input', function(msg, send, done) {

      // send/done compatibility for node-red < 1.0
      send = send || function() { node.send.apply(node, arguments) };
      done = done || function(error) { node.error.call(node, error, msg) };

      const filename = utils.extractValue('string', 'filename', node, msg, false);
      const name = utils.extractValue('string', 'name', node, msg, false);

      fs.readFile(filename, 'utf8', (err, json) => {
        if (err) {
          done(err);
          return;
        }
        const manager = new NlpManager();
        manager.import(json);
        // store globally
        globalContextHelper.set('nlp_' + (!_.isEmpty(name) ? name : 'default'), manager);
        // pass thru
        send({ ...msg, payload: manager });
        done();
      });
    });
  }