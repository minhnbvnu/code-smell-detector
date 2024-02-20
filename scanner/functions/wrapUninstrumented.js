function wrapUninstrumented(original, method) {
    return agent.tracer.wrapFunctionFirstNoSegment(original, method)
  }