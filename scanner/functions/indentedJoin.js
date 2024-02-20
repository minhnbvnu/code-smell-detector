function indentedJoin(xs2, indent) {
    if (xs2.length === 0) {
      return "";
    }
    var lineJoiner = "\n" + indent.prev + indent.base;
    return lineJoiner + $join.call(xs2, "," + lineJoiner) + "\n" + indent.prev;
  }