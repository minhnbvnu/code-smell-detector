function symbolParser (node) {
    var symbol = node.getAttribute('data-fa-symbol');
    return symbol === null ? false : symbol === '' ? true : symbol;
  }