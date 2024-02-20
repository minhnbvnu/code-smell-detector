function recordFeatureFlagMetrics(agent) {
  const configFlags = Object.keys(agent.config.feature_flag)
  for (let i = 0; i < configFlags.length; ++i) {
    const flag = configFlags[i]
    const enabled = agent.config.feature_flag[flag]

    if (enabled !== featureFlags[flag]) {
      agent.recordSupportability(
        'Nodejs/FeatureFlag/' + flag + '/' + (enabled ? 'enabled' : 'disabled')
      )
    }
  }
}