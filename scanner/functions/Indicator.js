function Indicator (scroller, options) {
        this.wrapper = typeof options.el == 'string' ? document.querySelector(options.el) : options.el;
        this.indicator = this.wrapper.children[0];
        this.indicatorStyle = this.indicator.style;
        this.scroller = scroller;

        this.options = {
            listenX: true,
            listenY: true,
            interactive: false,
            resize: true,
            defaultScrollbars: false,
            speedRatioX: 0,
            speedRatioY: 0
        };

        for ( var i in options ) {
            this.options[i] = options[i];
        }

        this.sizeRatioX = 1;
        this.sizeRatioY = 1;
        this.maxPosX = 0;
        this.maxPosY = 0;

        if ( this.options.interactive ) {
            if ( !this.options.disableTouch ) {
                utils.addEvent(this.indicator, 'touchstart', this);
                utils.addEvent(window, 'touchend', this);
            }
            if ( !this.options.disablePointer ) {
                utils.addEvent(this.indicator, 'MSPointerDown', this);
                utils.addEvent(window, 'MSPointerUp', this);
            }
            if ( !this.options.disableMouse ) {
                utils.addEvent(this.indicator, 'mousedown', this);
                utils.addEvent(window, 'mouseup', this);
            }
        }
    }