function dispatcherIncludes(agent, expected) {
  const dispatcher = agent.environment.get('Dispatcher')
  return dispatcher.includes(expected)
}