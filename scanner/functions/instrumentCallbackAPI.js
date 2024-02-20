function instrumentCallbackAPI(shim, amqp) {
  instrumentAMQP(shim, amqp, false)
  // 👀 take note the model is callback not channel 👀
  const model = shim.require('./lib/callback_model')
  wrapModel(shim, model, false)
}