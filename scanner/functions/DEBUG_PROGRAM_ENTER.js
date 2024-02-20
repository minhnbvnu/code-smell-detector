function DEBUG_PROGRAM_ENTER(hash) {
  //console.log(indentString(this.indent) + "Program");
  // API
  let event = this.createEvent(INSTR.PROGRAM_ENTER);
  event.hash = hash;
  event.indent = this.indent;
  event.trigger("enter");
  // API END
  this.indent += INDENT_FACTOR;
}