function Primitive(node1, _context, helpers) {
    this.node = node1;
    this._context = _context;
    this._renderables = this._context.renderables;
    this._attributes = this._context.attributes;
    this._shaders = this._context.shaders;
    this._overlays = this._context.overlays;
    this._animator = this._context.animator;
    this._types = this._attributes.types;
    this.node.controller = this;
    this.node.on('added', (function(_this) {
      return function(event) {
        return _this._added();
      };
    })(this));
    this.node.on('removed', (function(_this) {
      return function(event) {
        return _this._removed();
      };
    })(this));
    this.node.on('change', (function(_this) {
      return function(event) {
        if (_this._root) {
          return _this.change(event.changed, event.touched);
        }
      };
    })(this));
    this.reconfigure();
    this._get = this.node.get.bind(this.node);
    this._helpers = helpers(this, this.node.traits);
    this._handlers = {
      inherit: {},
      listen: [],
      watch: [],
      compute: []
    };
    this._root = this._parent = null;
    this.init();
  }