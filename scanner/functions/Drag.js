function Drag(el1, options) {
    var mouser;
    this.el = el1;
    this._stopInertia = bind(this._stopInertia, this);
    this._startInertia = bind(this._startInertia, this);
    this._onInertia = bind(this._onInertia, this);
    this._onDrag = bind(this._onDrag, this);
    this._onDragEnd = bind(this._onDragEnd, this);
    this._onDragStart = bind(this._onDragStart, this);
    this._getPageCoords = bind(this._getPageCoords, this);
    seen.Util.defaults(this, options, this.defaults);
    this.el = seen.Util.element(this.el);
    this._uid = seen.Util.uniqueId('dragger-');
    this._inertiaRunning = false;
    this._dragState = {
      dragging: false,
      origin: null,
      last: null,
      inertia: new seen.InertialMouse()
    };
    this.dispatch = seen.Events.dispatch('drag', 'dragStart', 'dragEnd', 'dragEndInertia');
    this.on = this.dispatch.on;
    mouser = new seen.MouseEvents(this.el);
    mouser.on("dragStart." + this._uid, this._onDragStart);
    mouser.on("dragEnd." + this._uid, this._onDragEnd);
    mouser.on("drag." + this._uid, this._onDrag);
  }