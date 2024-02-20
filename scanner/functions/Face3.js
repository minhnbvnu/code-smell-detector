function Face3(a, b, c, normal, color, materialIndex) {

  this.a = a;
  this.b = b;
  this.c = c;

  this.normal = (normal && normal.isVector3) ? normal : new Vector3();
  this.vertexNormals = Array.isArray(normal) ? normal : [];

  this.color = (color && color.isColor) ? color : new Color();
  this.vertexColors = Array.isArray(color) ? color : [];

  this.materialIndex = materialIndex !== undefined ? materialIndex : 0;

}