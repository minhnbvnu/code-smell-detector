function isClassOf(value, name) {
    return value != null && toString.call(value) == '[object ' + name + ']';
  }