function objToTS(obj, offset, zone) {
    return fixOffset(objToLocalTS(obj), offset, zone);
  }