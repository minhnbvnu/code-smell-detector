function convertNumberToCur(num) {
    return Pos(Math.floor(num), +num.toString().split('.').pop());
  }