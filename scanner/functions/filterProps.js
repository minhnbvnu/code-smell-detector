function filterProps (properties) {
    let ret = {};
    if (properties.length === 1) return robotState[properties[0]];
    for (var p in properties) {
      ret[properties[p]] = robotState[properties[p]];
    }
    return ret;
  }