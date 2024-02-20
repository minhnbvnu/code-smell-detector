function DEBUG_LITERAL(hash, value) {
  // API
  let event = this.createEvent(INSTR.LITERAL);
  event.hash = hash;
  event.value = value;
  event.indent = this.indent;
  event.trigger("fire");
  // API END
  return event.value;
}