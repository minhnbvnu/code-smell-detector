function identifierForController(controller, ident) {
  if (ident && isString(ident)) return ident;
  if (isString(controller)) {
    var match = CNTRL_REG.exec(controller);
    if (match) return match[3];
  }
}