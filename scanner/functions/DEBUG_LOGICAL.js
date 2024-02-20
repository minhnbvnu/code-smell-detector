function DEBUG_LOGICAL(hash, op, a, b) {
  let result = null;
  // API: add before, after
  switch (op) {
    case OP["&&"]:
      result = a ? b() : a;
    break;
    case OP["||"]:
      result = a ? a : b();
    break;
  };
  // API
  let event = this.createEvent(INSTR.LOGICAL);
  event.op = operatorToString(op);
  event.hash = hash;
  event.left = a;
  event.right = b;
  event.result = result;
  event.indent = this.indent;
  event.trigger("fire");
  // API END
  return event.result;
}