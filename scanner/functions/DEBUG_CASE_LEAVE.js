function DEBUG_CASE_LEAVE(hash) {
  this.indent -= INDENT_FACTOR;
  let isDefault = this.resolveCaseFrame(this.frame).isSwitchDefault;
  // API
  let event = this.createEvent(INSTR.CASE_LEAVE);
  event.hash = hash;
  event.isDefault = isDefault;
  event.indent = this.indent;
  event.trigger("leave");
  // API END
  //console.log(indentString(this.indent) + (isDefault ? "default" : "case") + " end");
  // FRAME
  this.popFrame();
  // FRAME END
}