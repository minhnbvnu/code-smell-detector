constructor(options) {
        super(options);
        this._checkMode();
        /**
         * events
         * @type {{click: DrawTool._clickHandler, mousemove: DrawTool._mouseMoveHandler, dblclick: DrawTool._doubleClickHandler, mousedown: DrawTool._mouseDownHandler, mouseup: DrawTool._mouseUpHandler}}
         * @private
         */
        this._events = {
            'click': this._clickHandler,
            'mousemove touchmove': this._mouseMoveHandler,
            'dblclick': this._doubleClickHandler,
            'mousedown touchstart': this._mouseDownHandler,
            'mouseup touchend': this._mouseUpHandler,
            'mousemove': this._mouseMoveHandler,
            'mousedown': this._mouseDownHandler,
            'mouseup': this._mouseUpHandler
        };
    }