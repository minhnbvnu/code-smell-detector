function SingleTouchInput() {
            this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
            this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
            this.started = false;
            Input.apply(this, arguments);
        }