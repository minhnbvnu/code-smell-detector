function getInfiniteLoopMessage (name, loopTo) {
    return wrapTag(name, '<!-- Infinite loop $ref:' + loopTo + ' -->');
  }