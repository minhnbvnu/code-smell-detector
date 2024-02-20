function copySegmentParameters(segment, parameters) {
  for (const key in parameters) {
    if (hasOwnProperty(parameters, key)) {
      segment.addAttribute(key, parameters[key])
    }
  }
}