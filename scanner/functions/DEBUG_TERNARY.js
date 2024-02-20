function DEBUG_TERNARY(hash, test, truthy, falsy) {
  let result = null;
  // API: add before, after
  if (test) result = truthy();
  else result = falsy();
  // API
  let event = this.createEvent(INSTR.TERNARY);
  event.hash = hash;
  event.test = test;
  event.falsy = falsy;
  event.truthy = truthy;
  event.result = result;
  event.indent = this.indent;
  event.trigger("fire");
  // API END
  return event.result;
}