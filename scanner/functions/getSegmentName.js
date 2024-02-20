function getSegmentName(metricName, typeDetails, route) {
  let segmentName = metricName
  if (typeDetails.path) {
    segmentName += route
  } else if (route.length > 1) {
    segmentName += '/' + route
  }

  return segmentName
}