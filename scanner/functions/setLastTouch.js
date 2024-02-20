function setLastTouch(eventData) {
            var touch = eventData.changedPointers[0];
            if (touch.identifier === this.primaryTouch) {
                var lastTouch = { x: touch.clientX, y: touch.clientY };
                this.lastTouches.push(lastTouch);
                var lts = this.lastTouches;
                var removeLastTouch = function () {
                    var i = lts.indexOf(lastTouch);
                    if (i > -1) {
                        lts.splice(i, 1);
                    }
                };
                setTimeout(removeLastTouch, DEDUP_TIMEOUT);
            }
        }