function localProperties(prop) {
    if (prop[0] == '_') { return false; }
    if (self.__ownProperties.indexOf(prop) != -1) { return false; }
    return true;
  }