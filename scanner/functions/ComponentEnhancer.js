function ComponentEnhancer(props) {
	      (0, _classCallCheck3['default'])(this, ComponentEnhancer);

	      var _this = (0, _possibleConstructorReturn3['default'])(this, (ComponentEnhancer.__proto__ || Object.getPrototypeOf(ComponentEnhancer)).call(this, props));

	      _this.onMouseDown = function (e) {
	        if (e.button !== 0) {
	          return;
	        }

	        var isVertical = _this.props.vertical;
	        var position = utils.getMousePosition(isVertical, e);
	        if (!utils.isEventFromHandle(e, _this.handlesRefs)) {
	          _this.dragOffset = 0;
	        } else {
	          var handlePosition = utils.getHandleCenterPosition(isVertical, e.target);
	          _this.dragOffset = position - handlePosition;
	          position = handlePosition;
	        }
	        _this.removeDocumentEvents();
	        _this.onStart(position);
	        _this.addDocumentMouseEvents();
	        utils.pauseEvent(e);
	      };

	      _this.onTouchStart = function (e) {
	        if (utils.isNotTouchEvent(e)) return;

	        var isVertical = _this.props.vertical;
	        var position = utils.getTouchPosition(isVertical, e);
	        if (!utils.isEventFromHandle(e, _this.handlesRefs)) {
	          _this.dragOffset = 0;
	        } else {
	          var handlePosition = utils.getHandleCenterPosition(isVertical, e.target);
	          _this.dragOffset = position - handlePosition;
	          position = handlePosition;
	        }
	        _this.onStart(position);
	        _this.addDocumentTouchEvents();
	        utils.pauseEvent(e);
	      };

	      _this.onFocus = function (e) {
	        var isVertical = _this.props.vertical;

	        if (utils.isEventFromHandle(e, _this.handlesRefs)) {
	          var handlePosition = utils.getHandleCenterPosition(isVertical, e.target);

	          _this.dragOffset = 0;
	          _this.onStart(handlePosition);
	          utils.pauseEvent(e);
	        }
	      };

	      _this.onBlur = function (e) {
	        _this.onEnd(e);
	      };

	      _this.onMouseUp = function () {
	        _this.onEnd();
	        _this.removeDocumentEvents();
	      };

	      _this.onMouseMove = function (e) {
	        if (!_this.sliderRef) {
	          _this.onEnd();
	          return;
	        }
	        var position = utils.getMousePosition(_this.props.vertical, e);
	        _this.onMove(e, position - _this.dragOffset);
	      };

	      _this.onTouchMove = function (e) {
	        if (utils.isNotTouchEvent(e) || !_this.sliderRef) {
	          _this.onEnd();
	          return;
	        }

	        var position = utils.getTouchPosition(_this.props.vertical, e);
	        _this.onMove(e, position - _this.dragOffset);
	      };

	      _this.onKeyDown = function (e) {
	        if (_this.sliderRef && utils.isEventFromHandle(e, _this.handlesRefs)) {
	          _this.onKeyboard(e);
	        }
	      };

	      _this.saveSlider = function (slider) {
	        _this.sliderRef = slider;
	      };

	      if (true) {
	        var step = props.step,
	            max = props.max,
	            min = props.min;

	        (0, _warning2['default'])(step && Math.floor(step) === step ? (max - min) % step === 0 : true, 'Slider[max] - Slider[min] (%s) should be a multiple of Slider[step] (%s)', max - min, step);
	      }
	      _this.handlesRefs = {};
	      return _this;
	    }