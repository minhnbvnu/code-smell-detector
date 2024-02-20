function DEBUG_IF_LEAVE(hash) {
  this.indent -= INDENT_FACTOR;
  // API
  let event = this.createEvent(INSTR.IF_LEAVE);
  event.hash = hash;
  event.indent = this.indent;
  event.trigger("leave");
  // API END
  //console.log(indentString(this.indent) + "if end");
  // FRAME
  this.popFrame();
  // FRAME END
}