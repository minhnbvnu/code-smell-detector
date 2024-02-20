function DEBUG_THIS(hash, ctx) {
  // API
  let event = this.createEvent(INSTR.THIS);
  event.hash = hash;
  event.context = ctx;
  event.indent = this.indent;
  event.trigger("fire");
  // API END
  return event.context;
}