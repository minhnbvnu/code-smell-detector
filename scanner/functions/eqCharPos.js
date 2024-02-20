function eqCharPos(a, b, msg) {
  function str(p) { return "{line:" + p.line + ",ch:" + p.ch + ",sticky:" + p.sticky + "}"; }
  if (a == b) return;
  if (a == null) throw new Failure(label("comparing null to " + str(b), msg));
  if (b == null) throw new Failure(label("comparing " + str(a) + " to null", msg));
  if (a.line != b.line || a.ch != b.ch) throw new Failure(label(str(a) + " != " + str(b), msg));
}