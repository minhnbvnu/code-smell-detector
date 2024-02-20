function DEBUG_VAR_INIT(hash, name, value) {
  //console.log(indentString(this.indent) + "⏩ Initialise " + name + "::" + value);

  // API
  let event = this.createEvent(INSTR.VAR_INIT);
  event.hash = hash;
  event.name = name;
  event.value = value;
  event.indent = this.indent;
  event.trigger("after");
  // API END

  return event.value;
}