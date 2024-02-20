function recordTouches(eventType, eventData) {
            if (eventType & INPUT_START) {
                this.primaryTouch = eventData.changedPointers[0].identifier;
                setLastTouch.call(this, eventData);
            }
            else if (eventType & (INPUT_END | INPUT_CANCEL)) {
                setLastTouch.call(this, eventData);
            }
        }