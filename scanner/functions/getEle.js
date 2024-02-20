function getEle(className) {
    if (!eleCache[className]) {
      eleCache[className] = $element[0].querySelector('.' + className);
    }
    return eleCache[className];
  }