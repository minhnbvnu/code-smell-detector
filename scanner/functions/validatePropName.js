function validatePropName(key) {
    if (key[0] !== "$") {
      return true;
    } else {
      warn(`Invalid prop name: "${key}" is a reserved property.`);
    }
    return false;
  }