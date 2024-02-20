function baseCompare (a, b, sortKeyIndex) {
    var sortKey = sortKeys[sortKeyIndex]
    if (sortKey) {
      if (sortKey !== '$key') {
        if (util.isObject(a) && '$value' in a) a = a.$value
        if (util.isObject(b) && '$value' in b) b = b.$value
      }
      a = util.isObject(a) ? util.getPath(a, sortKey) : a
      b = util.isObject(b) ? util.getPath(b, sortKey) : b
      a = (typeof a === 'string') ? a.toLowerCase() : a
      b = (typeof b === 'string') ? b.toLowerCase() : b
    }
    return a === b ? 0 : a > b ? order : -order
  }