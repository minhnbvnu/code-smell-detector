function InteractionHandler(body, canvas, selectionHandler) {
      _classCallCheck(this, InteractionHandler);

      this.body = body;
      this.canvas = canvas;
      this.selectionHandler = selectionHandler;
      this.navigationHandler = new _componentsNavigationHandler2['default'](body, canvas);

      // bind the events from hammer to functions in this object
      this.body.eventListeners.onTap = this.onTap.bind(this);
      this.body.eventListeners.onTouch = this.onTouch.bind(this);
      this.body.eventListeners.onDoubleTap = this.onDoubleTap.bind(this);
      this.body.eventListeners.onHold = this.onHold.bind(this);
      this.body.eventListeners.onDragStart = this.onDragStart.bind(this);
      this.body.eventListeners.onDrag = this.onDrag.bind(this);
      this.body.eventListeners.onDragEnd = this.onDragEnd.bind(this);
      this.body.eventListeners.onMouseWheel = this.onMouseWheel.bind(this);
      this.body.eventListeners.onPinch = this.onPinch.bind(this);
      this.body.eventListeners.onMouseMove = this.onMouseMove.bind(this);
      this.body.eventListeners.onRelease = this.onRelease.bind(this);
      this.body.eventListeners.onContext = this.onContext.bind(this);

      this.touchTime = 0;
      this.drag = {};
      this.pinch = {};
      this.popup = undefined;
      this.popupObj = undefined;
      this.popupTimer = undefined;

      this.body.functions.getPointer = this.getPointer.bind(this);

      this.options = {};
      this.defaultOptions = {
        dragNodes: true,
        dragView: true,
        hover: false,
        keyboard: {
          enabled: false,
          speed: { x: 10, y: 10, zoom: 0.02 },
          bindToWindow: true
        },
        navigationButtons: false,
        tooltipDelay: 300,
        zoomView: true
      };
      util.extend(this.options, this.defaultOptions);

      this.bindEventListeners();
    }