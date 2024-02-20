function tsPrintBraced(members, node) {
  this.token("{");

  if (members.length) {
    this.indent();
    this.newline();

    for (const member of members) {
      this.print(member, node);
      this.newline();
    }

    this.dedent();
    this.rightBrace();
  } else {
    this.token("}");
  }
}