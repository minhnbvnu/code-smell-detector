constructor(element, options = {}) {
        this._keyboard = options.keyboard || null;
        this._mouse = options.mouse || null;
        this._gamepads = options.gamepads || null;

        this._element = null;

        this._actions = {};
        this._axes = {};
        this._axesValues = {};

        if (element) {
            this.attach(element);
        }
    }