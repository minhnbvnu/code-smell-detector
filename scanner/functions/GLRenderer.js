function GLRenderer(el) {
  if (!(this instanceof GLRenderer)) return new GLRenderer(el);

  Emitter.call(this);

  this._el = el;
  this._drawFrame = this._drawFrame.bind(this);
  this._gl = GLUtil.getGLContext(el);
  this._gl.clearColor(0, 0, 0, 0);
  this._viewportArray = new Float32Array([el.width, el.height]);
  this._pointRenderer = new PointRenderer(this._gl, this._viewportArray);

  this._listen();
}