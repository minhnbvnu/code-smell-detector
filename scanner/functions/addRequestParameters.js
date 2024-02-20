function addRequestParameters(requestParameters) {
  for (const key in requestParameters) {
    if (props.hasOwn(requestParameters, key)) {
      this.trace.attributes.addAttribute(
        DESTS.NONE,
        REQUEST_PARAMS_PATH + key,
        requestParameters[key]
      )

      const segment = this.baseSegment

      segment.attributes.addAttribute(DESTS.NONE, REQUEST_PARAMS_PATH + key, requestParameters[key])
    }
  }
}