function wrapCast(cast, name) {
    if (typeof cast !== 'function' || cast.name === '__NR_wrappedCast') {
      return cast
    }

    const CAST_SEGMENT_NAME = 'Promise.' + name
    // eslint-disable-next-line camelcase
    return function __NR_wrappedCast() {
      const segment = _createSegment(CAST_SEGMENT_NAME)
      const prom = cast.apply(this, arguments)
      if (segment) {
        Contextualizer.link(null, prom, segment)
      }
      return prom
    }
  }