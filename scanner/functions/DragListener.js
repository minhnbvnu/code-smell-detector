function DragListener(options) {
        this.isInteracting = false;
        this.isDistanceSurpassed = false;
        this.isDelayEnded = false;
        this.isDragging = false;
        this.isTouch = false;
        this.isGeneric = false; // initiated by 'dragstart' (jqui)
        this.shouldCancelTouchScroll = true;
        this.scrollAlwaysKills = false;
        this.isAutoScroll = false;
        // defaults
        this.scrollSensitivity = 30; // pixels from edge for scrolling to start
        this.scrollSpeed = 200; // pixels per second, at maximum speed
        this.scrollIntervalMs = 50; // millisecond wait between scroll increment
        this.options = options || {};
    }