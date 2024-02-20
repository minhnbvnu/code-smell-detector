function DEBUG_LOOP_ENTER(hash, id, kind) {
  // API
  let event = this.createEvent(INSTR.LOOP_ENTER);
  event.hash = hash;
  event.indent = this.indent;
  event.kind = kind;
  event.trigger("enter");
  // API END
  //console.log(indentString(this.indent) + "loop", hash);
  // FRAME
  let frame = this.pushFrame(INSTR.LOOP_ENTER, hash);
  frame.values = [hash, 1];
  // FRAME END
  this.indent += INDENT_FACTOR;
}