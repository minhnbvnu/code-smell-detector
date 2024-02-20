function DEBUG_FUNCTION_LEAVE(hash, ctx) {
  this.currentScope = this.previousScope;
  let isSloppy = (this.$$frameHash <= 0) || this.nodes[this.$$frameHash].node.isSloppy;

  // API
  let event = this.createEvent(INSTR.FUNCTION_LEAVE);
  event.hash = hash;
  event.indent = this.indent - (isSloppy ? INDENT_FACTOR : 0);
  event.sloppy = isSloppy;
  event.name = this.nodes[hash].node.id.name;
  event.trigger("leave");
  // API END

  if (isSloppy) {
    this.indent -= INDENT_FACTOR;
    //console.log(indentString(this.indent) + "call", name, "end #sloppy", "->", [void 0]);
  }
}