function DEBUG_VAR_DECLARE(hash, name) {
  //console.log(indentString(this.indent) + "▶️ Declare " + name);

  // API
  let event = this.createEvent(INSTR.VAR_DECLARE);
  event.hash = hash;
  event.name = name;
  event.indent = this.indent;
  event.trigger("before");
  // API END

  return name;
}