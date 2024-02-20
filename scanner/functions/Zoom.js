function Zoom(el1, options) {
    var mouser;
    this.el = el1;
    this._onMouseWheel = bind(this._onMouseWheel, this);
    seen.Util.defaults(this, options, this.defaults);
    this.el = seen.Util.element(this.el);
    this._uid = seen.Util.uniqueId('zoomer-');
    this.dispatch = seen.Events.dispatch('zoom');
    this.on = this.dispatch.on;
    mouser = new seen.MouseEvents(this.el);
    mouser.on("mouseWheel." + this._uid, this._onMouseWheel);
  }