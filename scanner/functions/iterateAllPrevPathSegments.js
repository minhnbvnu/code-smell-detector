function* iterateAllPrevPathSegments(segment) {
  yield* iterate(segment, [])

  /**
   * @param {CodePathSegment} segment
   * @param {CodePathSegment[]} processed
   */
  function* iterate(segment, processed) {
    if (processed.includes(segment)) {
      return
    }
    const nextProcessed = [segment, ...processed]

    for (const prev of segment.prevSegments) {
      if (prev.prevSegments.length === 0) {
        yield [prev]
      } else {
        for (const segments of iterate(prev, nextProcessed)) {
          yield [prev, ...segments]
        }
      }
    }
  }
}