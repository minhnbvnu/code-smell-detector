function DEBUG_SWITCH_ENTER(hash) {
  // API
  let event = this.createEvent(INSTR.SWITCH_ENTER);
  event.hash = hash;
  event.indent = this.indent;
  event.trigger("enter");
  // API END
  //console.log(indentString(this.indent) + "switch");
  // FRAME
  let frame = this.pushFrame(INSTR.SWITCH_ENTER, hash);
  frame.values = [hash];
  // FRAME END
  this.indent += INDENT_FACTOR;
}