constructor(event, element, camera, inputSource) {
        super(event, element, camera);

        /**
         * The XR input source that this event was originally raised from.
         *
         * @type {import('../xr/xr-input-source.js').XrInputSource}
         */
        this.inputSource = inputSource;
    }