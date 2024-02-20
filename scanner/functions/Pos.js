function Pos(line, ch, sticky) {
  if ( sticky === void 0 ) { sticky = null; }

  if (!(this instanceof Pos)) { return new Pos(line, ch, sticky) }
  this.line = line;
  this.ch = ch;
  this.sticky = sticky;
}