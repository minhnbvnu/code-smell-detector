function isSyntheticEvent(eventData) {
            var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
            for (var i = 0; i < this.lastTouches.length; i++) {
                var t = this.lastTouches[i];
                var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
                if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
                    return true;
                }
            }
            return false;
        }