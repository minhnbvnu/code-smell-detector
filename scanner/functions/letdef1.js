function letdef1(type) {
    if (type.match(/[\]\)\};]/)) return cont();
    if (content == "=") return cont(expression, letdef2);
    if (type == ",") return cont(letdef1);
    return pass(pattern, maybetype, letdef1);
  }