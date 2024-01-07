constructor(current, previous) {
        if (typeof current === 'number') {
            this.value = current;
            this.pressed = current === 1;
            this.touched = current > 0;
        } else {
            this.value = current.value;
            this.pressed = current.pressed;
            this.touched = current.touched ?? current.value > 0;
        }

        if (previous) {
            if (typeof previous === 'number') {
                this.wasPressed = previous !== 1 && this.pressed;
                this.wasReleased = previous === 1 && !this.pressed;
                this.wasTouched = previous === 0 && this.touched;
            } else {
                this.wasPressed = !previous.pressed && this.pressed;
                this.wasReleased = previous.pressed && !this.pressed;
                this.wasTouched = !(previous.touched ?? previous.value > 0) && this.touched;
            }
        }
    }