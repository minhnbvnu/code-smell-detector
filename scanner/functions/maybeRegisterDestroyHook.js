function maybeRegisterDestroyHook(segmentMap, agent, hooks) {
  if (agent.config.feature_flag.unresolved_promise_cleanup) {
    logger.info('Adding destroy hook to clean up unresolved promises.')
    hooks.destroy = function destroyHandler(id) {
      segmentMap.delete(id)
    }
  }
}