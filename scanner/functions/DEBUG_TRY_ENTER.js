function DEBUG_TRY_ENTER(hash) {
  //console.log(indentString(this.indent) + "try");

  // API
  let event = this.createEvent(INSTR.TRY_ENTER);
  event.hash = hash;
  event.indent = this.indent;
  event.trigger("enter");
  // API END

  this.indent += INDENT_FACTOR;
  // FRAME
  let frame = this.pushFrame(INSTR.TRY_ENTER, hash);
  frame.values = [hash];
  // FRAME END
}