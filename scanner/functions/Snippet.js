function Snippet(language1, _signatures, _compiler, _name, _original) {
    var ref;
    this.language = language1;
    this._signatures = _signatures;
    this._compiler = _compiler;
    this._name = _name;
    this._original = _original;
    this.namespace = null;
    this.code = null;
    this.main = null;
    this.entry = null;
    this.uniforms = null;
    this.externals = null;
    this.symbols = null;
    this.attributes = null;
    this.varyings = null;
    if (!this.language) {
      delete this.language;
    }
    if (!this._signatures) {
      delete this._signatures;
    }
    if (!this._compiler) {
      delete this._compiler;
    }
    if (!this._original) {
      delete this._original;
    }
    if (!this._name) {
      this._name = (ref = this._signatures) != null ? ref.main.name : void 0;
    }
  }