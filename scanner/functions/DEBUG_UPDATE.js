function DEBUG_UPDATE(hash, op, value, prefix) {
  let result = value;
  // API
  let event = this.createEvent(INSTR.UPDATE);
  event.op = operatorToString(op);
  event.result = result;
  event.hash = hash;
  event.prefix = prefix;
  event.indent = this.indent;
  event.trigger("fire");
  // API END
  return event.result;
}