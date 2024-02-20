function attrRegExp(attr) {
    return new RegExp(attr + '\\s*=\\s*["\']?([^"\']*)["\']?', 'i');
  }