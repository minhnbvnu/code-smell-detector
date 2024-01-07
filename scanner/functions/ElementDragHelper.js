constructor(element, axis) {
        super();

        if (!element || !(element instanceof ElementComponent)) {
            throw new Error('Element was null or not an ElementComponent');
        }

        if (axis && axis !== 'x' && axis !== 'y') {
            throw new Error('Unrecognized axis: ' + axis);
        }

        this._element = element;
        this._app = element.system.app;
        this._axis = axis || null;
        this._enabled = true;
        this._dragScale = new Vec3();
        this._dragStartMousePosition = new Vec3();
        this._dragStartHandlePosition = new Vec3();
        this._deltaMousePosition = new Vec3();
        this._deltaHandlePosition = new Vec3();
        this._isDragging = false;

        this._toggleLifecycleListeners('on');
    }