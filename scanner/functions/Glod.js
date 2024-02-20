function Glod() {
  // Prevent instantiation without new.
  if (!Glod.prototype.isPrototypeOf(this)) {
    die('Glod: instantiate with `new Glod()`')
  }

  this._canvas            = null;
  this._gl                = null;
  this._vbos              = {};
  this._fbos              = {};
  this._rbos              = {};
  this._programs          = {};
  this._textures          = {};
  this._extensions        = {};

  this._variables         = {};

  this._mode              = -1;
  this._activeProgram     = null;
  this._contextLost       = false;
  this._onContextLost     = this.onContextLost.bind(this);
  this._onContextRestored = this.onContextRestored.bind(this);
  this.loseContext        = null;
  this.restoreContext     = null;
  this._initIds           = {};
  this._allocIds          = {};
  this._versionedIds      = {};

  this._optional  = {};
  this._optionalv = {};

  this._state = 0;
}