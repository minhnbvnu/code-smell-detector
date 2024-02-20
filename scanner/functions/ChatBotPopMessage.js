function ChatBotPopMessage(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    globalContextHelper.init(this.context().global);

    this.on('input', function(msg, send, done) {
      // send/done compatibility for node-red < 1.0
      send = send || function() { node.send.apply(node, arguments) };
      done = done || function(error) { node.error.call(node, error, msg) };
      // get previous message from stash      
      send({ 
        ...msg,
        payload: msg.previous != null ? msg.previous : msg.payload
      });
      done();
    });
  }