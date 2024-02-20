function DEBUG_ELSE_LEAVE(hash) {
  this.indent -= INDENT_FACTOR;
  // API
  let event = this.createEvent(INSTR.ELSE_LEAVE);
  event.hash = hash;
  event.indent = this.indent;
  event.trigger("leave");
  // API END
  //console.log(indentString(this.indent) + "else end");
  // FRAME
  this.popFrame();
  // FRAME END
}