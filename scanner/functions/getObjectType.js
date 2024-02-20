function getObjectType(object, tmp) {
    return ( (tmp = typeof(object)) == "object" ? object == null && "null" || Object.prototype.toString.call(object).slice(8, -1) : tmp ).toLowerCase();
  }