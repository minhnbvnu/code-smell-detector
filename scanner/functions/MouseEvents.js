function MouseEvents(el1, options) {
    this.el = el1;
    this._onMouseWheel = bind(this._onMouseWheel, this);
    this._onMouseUp = bind(this._onMouseUp, this);
    this._onMouseDown = bind(this._onMouseDown, this);
    this._onMouseMove = bind(this._onMouseMove, this);
    seen.Util.defaults(this, options, this.defaults);
    this.el = seen.Util.element(this.el);
    this._uid = seen.Util.uniqueId('mouser-');
    this.dispatch = seen.Events.dispatch('dragStart', 'drag', 'dragEnd', 'mouseMove', 'mouseDown', 'mouseUp', 'mouseWheel');
    this.on = this.dispatch.on;
    this._mouseDown = false;
    this.attach();
  }