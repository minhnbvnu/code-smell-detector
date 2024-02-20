function Mesh(options) {
  options = options || {};
  this.vertexBuffers = {};
  this.indexBuffers = {};
  this.addVertexBuffer('vertices', 'gl_Vertex');
  if (options.coords) this.addVertexBuffer('coords', 'gl_TexCoord');
  if (options.normals) this.addVertexBuffer('normals', 'gl_Normal');
  if (options.colors) this.addVertexBuffer('colors', 'gl_Color');
  if (!('triangles' in options) || options.triangles) this.addIndexBuffer('triangles');
  if (options.lines) this.addIndexBuffer('lines');
}