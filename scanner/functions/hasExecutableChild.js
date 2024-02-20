function hasExecutableChild(children) {
    var foundActive = false;
    for (var i = 0; i < children.length; i++) {
      if (children[i].isExecutable()) {
        foundActive = true;
        break;
      }
    }
    return foundActive;
  }