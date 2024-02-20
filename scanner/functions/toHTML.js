function toHTML(object) {
    return object && object.toHTML ? object.toHTML() : String.interpret(object);
  }