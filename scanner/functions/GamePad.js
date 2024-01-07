constructor(gamepad, map) {
        /**
         * The identifier for the gamepad. Its structure depends on device.
         *
         * @type {string}
         */
        this.id = gamepad.id;

        /**
         * The index for this controller. A gamepad that is disconnected and reconnected will retain the same index.
         *
         * @type {number}
         */
        this.index = gamepad.index;

        /**
         * The buttons present on the GamePad. Order is provided by API, use GamePad#buttons instead.
         *
         * @type {GamePadButton[]}
         * @ignore
         */
        this._buttons = gamepad.buttons.map(b => new GamePadButton(b));

        /**
         * The axes values from the GamePad. Order is provided by API, use GamePad#axes instead.
         *
         * @type {number[]}
         * @ignore
         */
        this._axes = [...gamepad.axes];

        /**
         * Previous value for the analog axes present on the gamepad. Values are between -1 and 1.
         *
         * @type {number[]}
         * @ignore
         */
        this._previousAxes = [...gamepad.axes];

        /**
         * The gamepad mapping detected by the browser. Value is either "standard", "xr-standard", "" or "custom". When empty string, you may need to update the mapping yourself. "custom" means you updated the mapping.
         *
         * @type {string}
         */
        this.mapping = map.mapping;

        /**
         * The buttons and axes map.
         *
         * @type {object}
         */
        this.map = map;

        /**
         * The hand this gamepad is usually handled on. Only relevant for XR pads. Value is either "left", "right" or "none".
         *
         * @type {string}
         */
        this.hand = gamepad.hand || 'none';

        /**
         * The original Gamepad API gamepad.
         *
         * @type {Gamepad}
         * @ignore
         */
        this.pad = gamepad;

        this._compileMapping();
    }