function ChatBotRules(config) {
    RED.nodes.createNode(this, config);
    globalContextHelper.init(this.context().global);
    const node = this;
    const global = {
      environment: getEnvironment()
    };
    node.rules = config.rules;

    this.on('input', function(msg) {
      const rules = utils.extractValue('arrayOfObject', 'rules', node, msg, true);
      executeRules(rules, msg, global)
        .then(
          function(rule) {
            var result = new Array(rules.length);
            result = _(result).map(function(value, idx) {
              return idx === (rule.index - 1) ? msg : null
            });
            node.send(result);
          },
          function() {
            // all rules failed, do nothing
          }
        );
    });
  }