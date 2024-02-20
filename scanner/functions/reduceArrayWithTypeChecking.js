function reduceArrayWithTypeChecking(array) {
    // Ensure that all items in the array are of the same type
    var firstType = null;
    for (var i = 0; i < array.length; i++) {
      var node = array[i];
      if (firstType === null) {
        firstType = node.type;
      } else {
        if (node.type !== firstType) {
          genError("Cannot add value of type " + node.type + " to array of type " +
            firstType + ".", node.line, node.column);
        }
      }
    }

    // Recursively reduce array of nodes into array of the nodes' values
    return array.map(reduceValueNode);
  }