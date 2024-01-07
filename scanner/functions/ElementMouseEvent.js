constructor(event, element, camera, x, y, lastX, lastY) {
        super(event, element, camera);

        this.x = x;
        this.y = y;

        /**
         * Whether the ctrl key was pressed.
         *
         * @type {boolean}
         */
        this.ctrlKey = event.ctrlKey || false;
        /**
         * Whether the alt key was pressed.
         *
         * @type {boolean}
         */
        this.altKey = event.altKey || false;
        /**
         * Whether the shift key was pressed.
         *
         * @type {boolean}
         */
        this.shiftKey = event.shiftKey || false;
        /**
         * Whether the meta key was pressed.
         *
         * @type {boolean}
         */
        this.metaKey = event.metaKey || false;

        /**
         * The mouse button.
         *
         * @type {number}
         */
        this.button = event.button;

        if (Mouse.isPointerLocked()) {
            /**
             * The amount of horizontal movement of the cursor.
             *
             * @type {number}
             */
            this.dx = event.movementX || event.webkitMovementX || event.mozMovementX || 0;
            /**
             * The amount of vertical movement of the cursor.
             *
             * @type {number}
             */
            this.dy = event.movementY || event.webkitMovementY || event.mozMovementY || 0;
        } else {
            this.dx = x - lastX;
            this.dy = y - lastY;
        }

        /**
         * The amount of the wheel movement.
         *
         * @type {number}
         */
        this.wheelDelta = 0;

        // deltaY is in a different range across different browsers. The only thing
        // that is consistent is the sign of the value so snap to -1/+1.
        if (event.type === 'wheel') {
            if (event.deltaY > 0) {
                this.wheelDelta = 1;
            } else if (event.deltaY < 0) {
                this.wheelDelta = -1;
            }
        }
    }