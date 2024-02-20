function DEBUG_ASSIGN(hash, op, obj, prop, value) {
  let result = null;
  // API: add before, after
  if (prop === null) {
    if (op === OP["="]) result = value;
    else result = value;
  } else {
    result = evalObjectAssignmentExpression(op, obj, prop, value);
  }
  // API
  let event = this.createEvent(INSTR.ASSIGN);
  event.op = operatorToString(op) + "=";
  event.hash = hash;
  event.object = obj;
  event.property = prop;
  event.value = value;
  event.result = result;
  event.indent = this.indent;
  event.trigger("fire");
  // API END
  return event.result;
}