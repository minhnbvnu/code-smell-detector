function simulateTestLoadAndUnload() {
  const agent = helper.instrumentMockedAgent()

  shimmer.registerInstrumentation({
    moduleName: CUSTOM_MODULE
  })

  require(CUSTOM_MODULE_PATH)

  helper.unloadAgent(agent)
}