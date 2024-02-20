function supportCustomBootstrapFile(runtime, envs) {
  if (runtime === 'custom') {
    if (envs['BOOTSTRAP_FILE']) {
      envs['AGENT_SCRIPT'] = envs['BOOTSTRAP_FILE'];
    }
  }
}