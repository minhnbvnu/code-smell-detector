function objCTypes(identifier) {
    return cTypes(identifier) || contains(basicObjCTypes, identifier);
  }