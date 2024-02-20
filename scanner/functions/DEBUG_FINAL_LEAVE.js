function DEBUG_FINAL_LEAVE(hash) {
  this.indent -= INDENT_FACTOR;

  // API
  let event = this.createEvent(INSTR.FINAL_LEAVE);
  event.hash = hash;
  event.indent = this.indent;
  event.trigger("leave");
  // API END

  this.popFrame();
  // FRAME END
}