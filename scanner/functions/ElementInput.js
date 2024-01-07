constructor(domElement, options) {
        this._app = null;
        this._attached = false;
        this._target = null;

        // force disable all element input events
        this._enabled = true;

        this._lastX = 0;
        this._lastY = 0;

        this._upHandler = this._handleUp.bind(this);
        this._downHandler = this._handleDown.bind(this);
        this._moveHandler = this._handleMove.bind(this);
        this._wheelHandler = this._handleWheel.bind(this);
        this._touchstartHandler = this._handleTouchStart.bind(this);
        this._touchendHandler = this._handleTouchEnd.bind(this);
        this._touchcancelHandler = this._touchendHandler;
        this._touchmoveHandler = this._handleTouchMove.bind(this);
        this._sortHandler = this._sortElements.bind(this);

        this._elements = [];
        this._hoveredElement = null;
        this._pressedElement = null;
        this._touchedElements = {};
        this._touchesForWhichTouchLeaveHasFired = {};
        this._selectedElements = {};
        this._selectedPressedElements = {};

        this._useMouse = !options || options.useMouse !== false;
        this._useTouch = !options || options.useTouch !== false;
        this._useXr = !options || options.useXr !== false;
        this._selectEventsAttached = false;

        if (platform.touch)
            this._clickedEntities = {};

        this.attach(domElement);
    }