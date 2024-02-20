function recordNodeVersionMetric(agent) {
  const nodeMajor = /^v?(\d+)/.exec(process.version)
  const version = (nodeMajor && nodeMajor[1]) || 'unknown'
  agent.recordSupportability(`Nodejs/Version/${version}`)
}