function hasAllProps (obj, properties) {
    for (var p in properties) {
      if (posibleCap.indexOf(properties[p]) > -1 && cap && Object.keys(cap).indexOf(properties[p]) === -1) {
        obj[properties[p]] = undefined; // asking for a non available capability, just set to undefined
      }
      if (!obj.hasOwnProperty(properties[p])) {
        return false;
      }
    }
    return true;
  }