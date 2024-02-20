function DEBUG_UNARY(hash, op, ctx, critical, value) {
  let result = null;
  // typeof argument is not defined
  if (op === OP["typeof"] && critical) {
    result = value;
  } else {
    result = evalUnaryExpression(op, ctx, value);
  }
  // API
  let event = this.createEvent(INSTR.UNARY);
  event.op = operatorToString(op);
  event.hash = hash;
  event.value = value;
  event.result = result;
  event.indent = this.indent;
  event.trigger("fire");
  // API END
  //console.log(indentString(this.indent) + operatorToString(op), value, "->", result, critical);
  return event.result;
}