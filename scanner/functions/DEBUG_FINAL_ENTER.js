function DEBUG_FINAL_ENTER(hash) {

  // API
  let event = this.createEvent(INSTR.FINAL_ENTER);
  event.hash = hash;
  event.indent = this.indent;
  event.trigger("enter");
  // API END

  this.indent += INDENT_FACTOR;
  // FRAME
  let frame = this.pushFrame(INSTR.FINAL_ENTER, hash);
  frame.values = [hash];
  // FRAME END
}