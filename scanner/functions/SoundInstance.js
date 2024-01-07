constructor(manager, sound, options) {
        super();

        /**
         * @type {import('./manager.js').SoundManager}
         * @private
         */
        this._manager = manager;

        /**
         * @type {number}
         * @private
         */
        this._volume = options.volume !== undefined ? math.clamp(Number(options.volume) || 0, 0, 1) : 1;

        /**
         * @type {number}
         * @private
         */
        this._pitch = options.pitch !== undefined ? Math.max(0.01, Number(options.pitch) || 0) : 1;

        /**
         * @type {boolean}
         * @private
         */
        this._loop = !!(options.loop !== undefined ? options.loop : false);

        /**
         * @type {import('./sound.js').Sound}
         * @private
         */
        this._sound = sound;

        /**
         * Start at 'stopped'.
         *
         * @type {number}
         * @private
         */
        this._state = STATE_STOPPED;

        /**
         * True if the manager was suspended.
         *
         * @type {boolean}
         * @private
         */
        this._suspended = false;

        /**
         * Greater than 0 if we want to suspend the event handled to the 'onended' event.
         * When an 'onended' event is suspended, this counter is decremented by 1.
         * When a future 'onended' event is to be suspended, this counter is incremented by 1.
         *
         * @type {number}
         * @private
         */
        this._suspendEndEvent = 0;

        /**
         * True if we want to suspend firing instance events.
         *
         * @type {boolean}
         * @private
         */
        this._suspendInstanceEvents = false;

        /**
         * If true then the instance will start playing its source when its created.
         *
         * @type {boolean}
         * @private
         */
        this._playWhenLoaded = true;

        /**
         * @type {number}
         * @private
         */
        this._startTime = Math.max(0, Number(options.startTime) || 0);

        /**
         * @type {number}
         * @private
         */
        this._duration = Math.max(0, Number(options.duration) || 0);

        /**
         * @type {number|null}
         * @private
         */
        this._startOffset = null;

        // external event handlers
        /** @private */
        this._onPlayCallback = options.onPlay;
        /** @private */
        this._onPauseCallback = options.onPause;
        /** @private */
        this._onResumeCallback = options.onResume;
        /** @private */
        this._onStopCallback = options.onStop;
        /** @private */
        this._onEndCallback = options.onEnd;

        if (hasAudioContext()) {
            /**
             * @type {number}
             * @private
             */
            this._startedAt = 0;

            /**
             * Manually keep track of the playback position because the Web Audio API does not
             * provide a way to do this accurately if the playbackRate is not 1.
             *
             * @type {number}
             * @private
             */
            this._currentTime = 0;

            /**
             * @type {number}
             * @private
             */
            this._currentOffset = 0;

            /**
             * The input node is the one that is connected to the source.
             *
             * @type {AudioNode|null}
             * @private
             */
            this._inputNode = null;

            /**
             * The connected node is the one that is connected to the destination (speakers). Any
             * external nodes will be connected to this node.
             *
             * @type {AudioNode|null}
             * @private
             */
            this._connectorNode = null;

            /**
             * The first external node set by a user.
             *
             * @type {AudioNode|null}
             * @private
             */
            this._firstNode = null;

            /**
             * The last external node set by a user.
             *
             * @type {AudioNode|null}
             * @private
             */
            this._lastNode = null;

            /**
             * Set to true if a play() request was issued when the AudioContext was still suspended,
             * and will therefore wait until it is resumed to play the audio.
             *
             * @type {boolean}
             * @private
             */
            this._waitingContextSuspension = false;

            this._initializeNodes();

            /** @private */
            this._endedHandler = this._onEnded.bind(this);
        } else {
            /** @private */
            this._isReady = false;

            /** @private */
            this._loadedMetadataHandler = this._onLoadedMetadata.bind(this);
            /** @private */
            this._timeUpdateHandler = this._onTimeUpdate.bind(this);
            /** @private */
            this._endedHandler = this._onEnded.bind(this);

            this._createSource();
        }
    }