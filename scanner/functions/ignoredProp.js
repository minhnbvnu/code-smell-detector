function ignoredProp(name) {
    return name == "__proto__" || name == "✖" || geckoIterators && name == "__iterator__";
  }