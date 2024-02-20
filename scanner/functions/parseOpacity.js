function parseOpacity(str) {
    var found = str.match(opacityRxp);
    return parseInt(found[1]) / 100;
  }