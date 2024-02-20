function Triangle(a, b, c) {

  this.a = (a !== undefined) ? a : new Vector3();
  this.b = (b !== undefined) ? b : new Vector3();
  this.c = (c !== undefined) ? c : new Vector3();

}