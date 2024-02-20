function DEBUG_LOOP_TEST(hash, value, kind) {
  // API
  let event = this.createEvent(INSTR.LOOP_TEST);
  event.hash = hash;
  event.indent = this.indent;
  event.value = value;
  event.kind = kind;
  event.trigger("test");
  // API END
  return event.value;
}