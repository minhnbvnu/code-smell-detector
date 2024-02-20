function DEBUG_MEMBER_EXPR(hash, object, property) {
  //console.log(indentString(this.indent), object, "[" + property + "]");

  // API
  let event = this.createEvent(INSTR.MEMBER_EXPR);
  event.hash = hash;
  event.object = object;
  event.property = property;
  event.indent = this.indent;
  event.trigger("fire");
  // API END

  return event.object;
}