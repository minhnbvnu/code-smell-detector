function TouchInput() {
            this.evTarget = TOUCH_TARGET_EVENTS;
            this.targetIds = {};
            Input.apply(this, arguments);
        }