function hasCallExpression(node) {
    /*
    Returns `true` if the provided `node` contains a call expression and `false` otherwise.
    */
    var currentNode = node;
    while (currentNode != null) {
      var _currentNode = currentNode,
          type = _currentNode.type;

      if (type[0] === 'C' && type[1] === 'a') {
        // Is CallExpression
        return true;
      } else if (type[0] === 'M' && type[1] === 'e' && type[2] === 'm') {
        // Is MemberExpression
        currentNode = currentNode.object;
      } else {
        return false;
      }
    }
  }