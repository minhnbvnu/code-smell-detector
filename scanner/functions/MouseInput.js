function MouseInput() {
            this.evEl = MOUSE_ELEMENT_EVENTS;
            this.evWin = MOUSE_WINDOW_EVENTS;
            this.pressed = false; // mousedown state
            Input.apply(this, arguments);
        }