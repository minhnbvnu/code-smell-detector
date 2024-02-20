function forEachRouteParams(params) {
  for (const key in params) {
    if (props.hasOwn(params, key)) {
      this.trace.attributes.addAttribute(DESTS.NONE, key, params[key])

      const segment = this.agent.tracer.getSegment()

      if (!segment) {
        logger.trace(
          'Active segment not available, not adding request.parameters.route attribute for %s',
          key
        )
      } else {
        segment.attributes.addAttribute(DESTS.NONE, key, params[key])
      }
    }
  }
}