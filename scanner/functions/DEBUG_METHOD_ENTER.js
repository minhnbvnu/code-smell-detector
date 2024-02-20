function DEBUG_METHOD_ENTER(hash, cls, isConstructor, args) {
  // API TODO
  if (isConstructor) {
    let tree = getInheritanceTree(cls);
    console.log(indentString(this.indent) + "ctor", tree.join("->"));
  } else {
    console.log(indentString(this.indent) + "method");
  }
  this.indent += INDENT_FACTOR;
  let frame = this.pushFrame(INSTR.METHOD_ENTER, hash);
  frame.values = [hash, cls, isConstructor, args];
}