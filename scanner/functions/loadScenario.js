function loadScenario(name, options = {}) {
  const opts = Object.assign({duration: 30, hz: 10, live: false}, normalizeOptions(options));

  if (!Scenarios[name]) {
    return null;
  }

  const scenario = Scenarios[name](options);

  const data = {
    // TODO: w/o stringify, the the object is not sent properly
    // means metadata as an object is broken in server
    metadata: JSON.stringify(scenario.getMetadata()),
    messages: [],
    timing: []
  };

  const messageLimit = opts.duration * opts.hz;
  const messageLength = 1.0 / opts.hz;

  for (let i = 0; i < messageLimit; i++) {
    const timeOffset = messageLength * i;
    const message = scenario.getMessage(timeOffset);
    data.timing.push(message.data.updates[0].timestamp);
    // TODO: this also seems strange? why stringify
    // I think the XVIZformatWriter should take care of this
    data.messages.push(JSON.stringify(message));
  }

  return data;
}