constructor() {
        super();

        /**
         * Whether gamepads are supported by this device.
         *
         * @type {boolean}
         */
        this.gamepadsSupported = platform.gamepads;

        /**
         * The list of current gamepads.
         *
         * @type {GamePad[]}
         */
        this.current = [];

        /**
         * The list of previous buttons states
         *
         * @type {boolean[][]}
         * @ignore
         */
        this._previous = [];

        this._ongamepadconnectedHandler = this._ongamepadconnected.bind(this);
        this._ongamepaddisconnectedHandler = this._ongamepaddisconnected.bind(this);

        window.addEventListener('gamepadconnected', this._ongamepadconnectedHandler, false);
        window.addEventListener('gamepaddisconnected', this._ongamepaddisconnectedHandler, false);

        this.poll();
    }