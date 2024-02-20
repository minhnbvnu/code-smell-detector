function setupAgent(context, config) {
    context.agent = helper.instrumentMockedAgent(config)
    context.agent.config.entity_guid = 'test-guid'
    context.pino = require('pino')
    context.stream = sink()
    context.logger = context.pino({ level: 'debug' }, context.stream)
    return context.agent.config
  }