function isFinite$1(obj) {
    return !isSymbol(obj) && _isFinite(obj) && !isNaN(parseFloat(obj));
  }