function DEBUG_BREAK(hash, label, ctx) {
  // API
  let event = this.createEvent(INSTR.BREAK);
  event.hash = hash;
  event.value = true;
  event.label = label;
  event.indent = this.indent;
  event.trigger("fire");
  // API END
  //console.log(indentString(this.indent) + "break", label ? label : "");
  // FRAME
  let expect = this.resolveBreakFrame(this.frame, label);
  this.leaveFrameUntil(expect);
  // FRAME END
  return event.value;
}