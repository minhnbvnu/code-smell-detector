function* iterateAllNextPathSegments(segment) {
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

    for (const next of segment.nextSegments) {
      if (next.nextSegments.length === 0) {
        yield [next]
      } else {
        for (const segments of iterate(next, nextProcessed)) {
          yield [next, ...segments]
        }
      }
    }
  }
}