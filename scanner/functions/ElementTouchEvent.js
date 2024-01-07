constructor(event, element, camera, x, y, touch) {
        super(event, element, camera);

        /**
         * The Touch objects representing all current points of contact with the surface,
         * regardless of target or changed status.
         *
         * @type {Touch[]}
         */
        this.touches = event.touches;
        /**
         * The Touch objects representing individual points of contact whose states changed between
         * the previous touch event and this one.
         *
         * @type {Touch[]}
         */
        this.changedTouches = event.changedTouches;
        this.x = x;
        this.y = y;
        /**
         * The touch object that triggered the event.
         *
         * @type {Touch}
         */
        this.touch = touch;
    }