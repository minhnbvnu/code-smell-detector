function storeOrDirty(key, value) {
    // Store the key on the user object and return whether something changed
    if (!angular.equals(user[key], value)) {
      user[key] = value;
      return true;
    }
    return false;
  }