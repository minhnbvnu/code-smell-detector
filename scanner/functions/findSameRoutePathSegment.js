function findSameRoutePathSegment(segment) {
  /** @type {Set<CodePathSegment>} */
  const routeSegments = new Set()
  for (const route of iterateAllPrevPathSegments(segment)) {
    if (routeSegments.size === 0) {
      // First
      for (const seg of route) {
        routeSegments.add(seg)
      }
      continue
    }
    for (const seg of routeSegments) {
      if (!route.includes(seg)) {
        routeSegments.delete(seg)
      }
    }
  }

  for (const routeSegment of routeSegments) {
    let hasUnreached = false
    for (const segments of iterateAllNextPathSegments(routeSegment)) {
      if (!segments.includes(segment)) {
        // It has a route that does not reach the given path.
        hasUnreached = true
        break
      }
    }
    if (!hasUnreached) {
      return routeSegment
    }
  }
  return null
}