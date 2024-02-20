function DEBUG_CASE_ENTER(hash, value, isDefault) {
  // API
  let event = this.createEvent(INSTR.CASE_ENTER);
  event.hash = hash;
  event.value = value;
  event.default = isDefault;
  event.indent = this.indent;
  event.trigger("enter");
  // API END
  //console.log(indentString(this.indent) + (isDefault ? "default" : "case"));
  // FRAME
  let frame = this.pushFrame(INSTR.CASE_ENTER, hash);
  frame.values = [hash, value, isDefault];
  this.frame.isSwitchDefault = isDefault;
  // FRAME END
  this.indent += INDENT_FACTOR;
}