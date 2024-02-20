function DEBUG_CASE_TEST(hash, value) {
  // API
  let event = this.createEvent(INSTR.CASE_TEST);
  event.hash = hash;
  event.value = value;
  event.indent = this.indent;
  event.trigger("test");
  // API END
  return event.value;
}