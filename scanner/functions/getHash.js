function getHash(url) {
    var index = url.indexOf('#');
    return index === -1 ? '' : url.substr(index);
  }