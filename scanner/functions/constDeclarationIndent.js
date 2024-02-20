function constDeclarationIndent() {
  this.token(",");
  this.newline();
  if (this.endsWith("\n")) for (let i = 0; i < 6; i++) this.space(true);
}