function PointRenderer(gl, viewportArray) {
  this._gl = gl;
  this._viewportArray = viewportArray;
  this._verticesCache = [];
  this._sizesCache = [];
  this._vArray = new Float32Array(MAX_POINTS * 2);
  this._sArray = new Float32Array(MAX_POINTS);
  this._texture = createCircleTexture(gl);
  this._shader = createCircleShader(gl, viewportArray);
  this._positionBuffer = gl.createBuffer();
  this._sizeBuffer = gl.createBuffer();
}