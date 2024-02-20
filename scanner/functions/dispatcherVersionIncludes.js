function dispatcherVersionIncludes(agent, expected) {
  const dispatcherVersion = agent.environment.get('Dispatcher Version')
  return dispatcherVersion.includes(expected)
}