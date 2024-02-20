function DEBUG_LOOP_LEAVE(hash, entered, kind) {
  // loop never entered, so dont leave it
  if (entered === 0) return;
  this.indent -= INDENT_FACTOR;
  // API
  let event = this.createEvent(INSTR.LOOP_LEAVE);
  event.hash = hash;
  event.indent = this.indent;
  event.kind = kind;
  event.trigger("leave");
  // API END
  //console.log(indentString(this.indent) + "loop end", hash);
  // FRAME
  this.popFrame();
  // FRAME END
}