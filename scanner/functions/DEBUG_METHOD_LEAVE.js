function DEBUG_METHOD_LEAVE(hash, cls, isConstructor) {
  // API TODO
  this.indent -= INDENT_FACTOR;
  console.log(indentString(this.indent) + (isConstructor ? "ctor" : "method") + " end");
  this.popFrame();
}