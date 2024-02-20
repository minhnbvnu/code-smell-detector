function ChatBotGoogleAnalytics(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    this.measurementId = config.measurementId;
    this.secretApi = config.secretApi;
    this.eventName = config.eventName;
    this.eventValue = config.eventValue;

    this.on('input', async function(msg, send, done) {
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
      const userId = getUserId(msg);
      const template = MessageTemplate(msg, node);
      const transport = getTransport(msg);

      // get vars
      let measurementId = extractValue('string', 'measurementId', node, msg);
      let secretApi = extractValue('string', 'secretApi', node, msg);
      let eventName = extractValue('string', 'eventName', node, msg);
      let eventValue = extractValue(['string', 'object'], 'eventValue', node, msg);

      // defaults to some event
      if (_.isEmpty(eventName) && msg.sentMessage != null) {
        eventName = 'OutboundMessage';
      } else if (_.isEmpty(eventName) && msg.originalMessage != null) {
        eventName = 'InboundMessage';
      }

      // prepare payload
      const eventParsed = await template(eventName);
      const url = `https://www.google-analytics.com/mp/collect?api_secret=${secretApi}&measurement_id=${measurementId}`;
      const params = {
        session_id: chatId,
        transport: sanitizeParamValue(transport)
      };
      if (_.isString(eventValue) && !_.isEmpty(eventValue)) {
        params.value = sanitizeParamValue(await template(eventValue));
      }
      const gaPayload = {
        client_id: msg.originalMessage.chatbotId,
        user_id: userId,
        timestamp_micros: String((new Date()).getTime() * 1000),
        non_personalized_ads: false,
        events: [
            {
              name: sanitizeEventName(eventParsed),
              params
            }
          ]
      };

      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(gaPayload)
      });

      if (res.status >= 300) {
        // eslint-disable-next-line no-console
        console.log(`Error sending event ${eventParsed} to Google Analytics`);
      }
      done();
    });
  }