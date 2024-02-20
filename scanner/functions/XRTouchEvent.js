function XRTouchEvent(eventName, target, touches, targetTouchs, changedTouches) {
        this.type = eventName;
        this.target = target;
        this.touches = touches;
        this.targetTouches = targetTouchs;
        this.changedTouches = changedTouches;
        this.ctrlKey = false;
        this.altKey = false;
        this.metaKey = false;
        this.shiftKey = false;
        this.preventDefault = function () {};
      }