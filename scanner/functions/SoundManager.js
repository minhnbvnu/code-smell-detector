constructor() {
        super();

        /**
         * The underlying AudioContext, lazy loaded in the 'context' property.
         *
         * @type {AudioContext}
         * @private
         */
        this._context = null;

        this.AudioContext = (typeof AudioContext !== 'undefined' && AudioContext) ||
                            (typeof webkitAudioContext !== 'undefined' && webkitAudioContext);

        if (!this.AudioContext) {
            Debug.warn('No support for 3D audio found');
        }

        this._unlockHandlerFunc = this._unlockHandler.bind(this);

        // user suspended audio
        this._userSuspended = false;

        this.listener = new Listener(this);

        this._volume = 1;
    }