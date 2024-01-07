constructor(device, event) {
        /**
         * The target DOM element that the event was fired from.
         *
         * @type {Element}
         */
        this.element = event.target;
        /**
         * The original browser TouchEvent.
         *
         * @type {globalThis.TouchEvent}
         */
        this.event = event;

        /**
         * A list of all touches currently in contact with the device.
         *
         * @type {Touch[]}
         */
        this.touches = [];
        /**
         * A list of touches that have changed since the last event.
         *
         * @type {Touch[]}
         */
        this.changedTouches = [];

        if (event) {
            for (let i = 0, l = event.touches.length; i < l; i++) {
                this.touches.push(new Touch(event.touches[i]));
            }


            for (let i = 0, l = event.changedTouches.length; i < l; i++) {
                this.changedTouches.push(new Touch(event.changedTouches[i]));
            }
        }
    }