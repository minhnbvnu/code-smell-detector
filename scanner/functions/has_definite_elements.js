function has_definite_elements(result) {
    if (result.size === 0)
      return false;
    for (const exist of result.values()) {
      if (exist === NodeExist.Definitely) {
        return true;
      }
    }
    return false;
  }