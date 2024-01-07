constructor(event, element, camera) {
        /**
         * The MouseEvent or TouchEvent that was originally raised.
         *
         * @type {MouseEvent|TouchEvent}
         */
        this.event = event;

        /**
         * The ElementComponent that this event was originally raised on.
         *
         * @type {import('../components/element/component.js').ElementComponent}
         */
        this.element = element;

        /**
         * The CameraComponent that this event was originally raised via.
         *
         * @type {import('../components/camera/component.js').CameraComponent}
         */
        this.camera = camera;

        this._stopPropagation = false;
    }