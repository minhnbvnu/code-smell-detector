function _getFlag(element, attribute) {
    return $(element).hasAttribute(attribute) ? attribute : null;
  }