function _createSegment(name, parent) {
    return agent.config.feature_flag.promise_segments === true
      ? agent.tracer.createSegment(name, null, parent)
      : parent || agent.tracer.getSegment()
  }