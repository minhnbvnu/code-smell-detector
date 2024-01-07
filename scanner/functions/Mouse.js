constructor(element) {
        super();

        // Clear the mouse state
        this._lastX = 0;
        this._lastY = 0;
        this._buttons = [false, false, false];
        this._lastbuttons = [false, false, false];


        // Setup event handlers so they are bound to the correct 'this'
        this._upHandler = this._handleUp.bind(this);
        this._downHandler = this._handleDown.bind(this);
        this._moveHandler = this._handleMove.bind(this);
        this._wheelHandler = this._handleWheel.bind(this);
        this._contextMenuHandler = (event) => {
            event.preventDefault();
        };

        this._target = null;
        this._attached = false;

        this.attach(element);
    }