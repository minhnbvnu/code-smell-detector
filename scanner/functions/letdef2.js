function letdef2(type) {
    if (type.match(/[\]\)\};,]/)) return pass(letdef1);
    else return pass(expression, letdef2);
  }