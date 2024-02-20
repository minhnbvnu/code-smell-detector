function TouchMouseInput() {
            Input.apply(this, arguments);
            var handler = bindFn(this.handler, this);
            this.touch = new TouchInput(this.manager, handler);
            this.mouse = new MouseInput(this.manager, handler);
            this.primaryTouch = null;
            this.lastTouches = [];
        }