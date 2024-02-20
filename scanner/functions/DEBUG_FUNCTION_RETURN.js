function DEBUG_FUNCTION_RETURN(hash, name, value) {

  let isSloppy = (this.$$frameHash <= 0) || this.nodes[this.$$frameHash].node.isSloppy;

  // API
  let event = this.createEvent(INSTR.FUNCTION_RETURN);
  event.hash = hash;
  event.name = name;
  event.return = value;
  event.indent = this.indent - (isSloppy ? INDENT_FACTOR : 0);
  event.sloppy = isSloppy;
  event.trigger("return");
  // API END

  // FRAME
  let expect = this.resolveReturnFrame(this.frame);
  this.leaveFrameUntil(expect);
  // FRAME END
  this.currentScope = this.previousScope;

  if (isSloppy) {
    this.indent -= INDENT_FACTOR;
    //console.log(indentString(this.indent) + "call", name, "end #sloppy", "->", [value]);
  }
  return event.return;
}