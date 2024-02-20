function DEBUG_OP_NEW(hash, ctor, args) {

  // API
  let event = this.createEvent(INSTR.OP_NEW);
  event.hash = hash;
  event.ctor = ctor;
  event.name = ctor.name || ctor.constructor.name;
  event.arguments = args;
  event.indent = this.indent;
  event.trigger("before");
  // API END

  //console.log(indentString(this.indent) + "new " + ctor.name);

  this.indent += INDENT_FACTOR;

  // FRAME
  let frame = this.pushFrame(INSTR.OP_NEW, hash);
  frame.values = [hash, event.ctor, event.arguments];
  // FRAME END

  return new event.ctor(...event.arguments);
}