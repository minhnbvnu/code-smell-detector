function DEBUG_IF_TEST(hash, value) {
  // API
  let event = this.createEvent(INSTR.IF_TEST);
  event.hash = hash;
  event.value = value;
  event.indent = this.indent;
  event.trigger("test");
  // API END
  return event.value;
}