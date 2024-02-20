function instrumentChannelAPI(shim, amqp) {
  instrumentAMQP(shim, amqp, true)
  // 👀 take note the model is channel not callback 👀
  const model = shim.require('./lib/channel_model')
  wrapModel(shim, model, true)
}