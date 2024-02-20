function DEBUG_ELSE_ENTER(hash) {
  // API
  let event = this.createEvent(INSTR.ELSE_ENTER);
  event.hash = hash;
  event.indent = this.indent;
  event.trigger("enter");
  // API END
  //console.log(indentString(this.indent) + "else");
  // FRAME
  let frame = this.pushFrame(INSTR.ELSE_ENTER, hash);
  frame.values = [hash];
  // FRAME END
  this.indent += INDENT_FACTOR;
}