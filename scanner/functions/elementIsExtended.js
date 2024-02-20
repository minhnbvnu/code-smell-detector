function elementIsExtended(element) {
    var uid = getUniqueElementID(element);
    return (uid in EXTENDED);
  }