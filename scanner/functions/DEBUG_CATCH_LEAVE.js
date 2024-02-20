function DEBUG_CATCH_LEAVE(hash) {
  this.indent -= INDENT_FACTOR;

  // API
  let event = this.createEvent(INSTR.CATCH_LEAVE);
  event.hash = hash;
  event.indent = this.indent;
  event.trigger("leave");
  // API END

  this.popFrame();
  // FRAME END
}