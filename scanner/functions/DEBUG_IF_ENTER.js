function DEBUG_IF_ENTER(hash, value) {
  //console.log(indentString(this.indent) + "if");
  // FRAME
  let frame = this.pushFrame(INSTR.IF_ENTER, hash);
  frame.values = [hash, value];
  // FRAME END
  // API
  let event = this.createEvent(INSTR.IF_ENTER);
  event.hash = hash;
  event.value = value;
  event.indent = this.indent;
  event.trigger("enter");
  // API END
  this.indent += INDENT_FACTOR;
}