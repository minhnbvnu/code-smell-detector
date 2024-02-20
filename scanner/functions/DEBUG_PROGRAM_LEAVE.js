function DEBUG_PROGRAM_LEAVE(hash, ret) {
  this.indent -= INDENT_FACTOR;
  //console.log(indentString(this.indent) + "Program end ->", ret);
  // API
  let event = this.createEvent(INSTR.PROGRAM_LEAVE);
  event.hash = hash;
  event.indent = this.indent;
  event.return = ret;
  event.trigger("leave");
  // API END
  return event.return;
}