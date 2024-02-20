function createSlider(Component) {
	  var _class, _temp;

	  return _temp = _class = function (_Component) {
	    (0, _inherits3['default'])(ComponentEnhancer, _Component);

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

	    (0, _createClass3['default'])(ComponentEnhancer, [{
	      key: 'componentWillUnmount',
	      value: function componentWillUnmount() {
	        if ((0, _get3['default'])(ComponentEnhancer.prototype.__proto__ || Object.getPrototypeOf(ComponentEnhancer.prototype), 'componentWillUnmount', this)) (0, _get3['default'])(ComponentEnhancer.prototype.__proto__ || Object.getPrototypeOf(ComponentEnhancer.prototype), 'componentWillUnmount', this).call(this);
	        this.removeDocumentEvents();
	      }
	    }, {
	      key: 'componentDidMount',
	      value: function componentDidMount() {
	        this.document = this.sliderRef.ownerDocument;
	      }
	    }, {
	      key: 'addDocumentTouchEvents',
	      value: function addDocumentTouchEvents() {
	        // just work for Chrome iOS Safari and Android Browser
	        this.onTouchMoveListener = (0, _addEventListener2['default'])(this.document, 'touchmove', this.onTouchMove);
	        this.onTouchUpListener = (0, _addEventListener2['default'])(this.document, 'touchend', this.onEnd);
	      }
	    }, {
	      key: 'addDocumentMouseEvents',
	      value: function addDocumentMouseEvents() {
	        this.onMouseMoveListener = (0, _addEventListener2['default'])(this.document, 'mousemove', this.onMouseMove);
	        this.onMouseUpListener = (0, _addEventListener2['default'])(this.document, 'mouseup', this.onEnd);
	      }
	    }, {
	      key: 'removeDocumentEvents',
	      value: function removeDocumentEvents() {
	        /* eslint-disable no-unused-expressions */
	        this.onTouchMoveListener && this.onTouchMoveListener.remove();
	        this.onTouchUpListener && this.onTouchUpListener.remove();

	        this.onMouseMoveListener && this.onMouseMoveListener.remove();
	        this.onMouseUpListener && this.onMouseUpListener.remove();
	        /* eslint-enable no-unused-expressions */
	      }
	    }, {
	      key: 'getSliderStart',
	      value: function getSliderStart() {
	        var slider = this.sliderRef;
	        var rect = slider.getBoundingClientRect();

	        return this.props.vertical ? rect.top : rect.left;
	      }
	    }, {
	      key: 'getSliderLength',
	      value: function getSliderLength() {
	        var slider = this.sliderRef;
	        if (!slider) {
	          return 0;
	        }

	        var coords = slider.getBoundingClientRect();
	        return this.props.vertical ? coords.height : coords.width;
	      }
	    }, {
	      key: 'calcValue',
	      value: function calcValue(offset) {
	        var _props = this.props,
	            vertical = _props.vertical,
	            min = _props.min,
	            max = _props.max;

	        var ratio = Math.abs(Math.max(offset, 0) / this.getSliderLength());
	        var value = vertical ? (1 - ratio) * (max - min) + min : ratio * (max - min) + min;
	        return value;
	      }
	    }, {
	      key: 'calcValueByPos',
	      value: function calcValueByPos(position) {
	        var pixelOffset = position - this.getSliderStart();
	        var nextValue = this.trimAlignValue(this.calcValue(pixelOffset));
	        return nextValue;
	      }
	    }, {
	      key: 'calcOffset',
	      value: function calcOffset(value) {
	        var _props2 = this.props,
	            min = _props2.min,
	            max = _props2.max;

	        var ratio = (value - min) / (max - min);
	        return ratio * 100;
	      }
	    }, {
	      key: 'saveHandle',
	      value: function saveHandle(index, handle) {
	        this.handlesRefs[index] = handle;
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        var _classNames;

	        var _props3 = this.props,
	            prefixCls = _props3.prefixCls,
	            className = _props3.className,
	            marks = _props3.marks,
	            dots = _props3.dots,
	            step = _props3.step,
	            included = _props3.included,
	            disabled = _props3.disabled,
	            vertical = _props3.vertical,
	            min = _props3.min,
	            max = _props3.max,
	            children = _props3.children,
	            maximumTrackStyle = _props3.maximumTrackStyle,
	            style = _props3.style,
	            railStyle = _props3.railStyle,
	            dotStyle = _props3.dotStyle,
	            activeDotStyle = _props3.activeDotStyle;

	        var _get$call = (0, _get3['default'])(ComponentEnhancer.prototype.__proto__ || Object.getPrototypeOf(ComponentEnhancer.prototype), 'render', this).call(this),
	            tracks = _get$call.tracks,
	            handles = _get$call.handles;

	        var sliderClassName = (0, _classnames2['default'])(prefixCls, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-with-marks', Object.keys(marks).length), (0, _defineProperty3['default'])(_classNames, prefixCls + '-disabled', disabled), (0, _defineProperty3['default'])(_classNames, prefixCls + '-vertical', vertical), (0, _defineProperty3['default'])(_classNames, className, className), _classNames));
	        return _react2['default'].createElement(
	          'div',
	          {
	            ref: this.saveSlider,
	            className: sliderClassName,
	            onTouchStart: disabled ? noop : this.onTouchStart,
	            onMouseDown: disabled ? noop : this.onMouseDown,
	            onMouseUp: disabled ? noop : this.onMouseUp,
	            onKeyDown: disabled ? noop : this.onKeyDown,
	            onFocus: disabled ? noop : this.onFocus,
	            onBlur: disabled ? noop : this.onBlur,
	            style: style
	          },
	          _react2['default'].createElement('div', {
	            className: prefixCls + '-rail',
	            style: (0, _extends3['default'])({}, maximumTrackStyle, railStyle)
	          }),
	          tracks,
	          _react2['default'].createElement(_Steps2['default'], {
	            prefixCls: prefixCls,
	            vertical: vertical,
	            marks: marks,
	            dots: dots,
	            step: step,
	            included: included,
	            lowerBound: this.getLowerBound(),
	            upperBound: this.getUpperBound(),
	            max: max,
	            min: min,
	            dotStyle: dotStyle,
	            activeDotStyle: activeDotStyle
	          }),
	          handles,
	          _react2['default'].createElement(_Marks2['default'], {
	            className: prefixCls + '-mark',
	            vertical: vertical,
	            marks: marks,
	            included: included,
	            lowerBound: this.getLowerBound(),
	            upperBound: this.getUpperBound(),
	            max: max,
	            min: min
	          }),
	          children
	        );
	      }
	    }]);
	    return ComponentEnhancer;
	  }(Component), _class.displayName = 'ComponentEnhancer(' + Component.displayName + ')', _class.propTypes = (0, _extends3['default'])({}, Component.propTypes, {
	    min: _propTypes2['default'].number,
	    max: _propTypes2['default'].number,
	    step: _propTypes2['default'].number,
	    marks: _propTypes2['default'].object,
	    included: _propTypes2['default'].bool,
	    className: _propTypes2['default'].string,
	    prefixCls: _propTypes2['default'].string,
	    disabled: _propTypes2['default'].bool,
	    children: _propTypes2['default'].any,
	    onBeforeChange: _propTypes2['default'].func,
	    onChange: _propTypes2['default'].func,
	    onAfterChange: _propTypes2['default'].func,
	    handle: _propTypes2['default'].func,
	    dots: _propTypes2['default'].bool,
	    vertical: _propTypes2['default'].bool,
	    style: _propTypes2['default'].object,
	    minimumTrackStyle: _propTypes2['default'].object, // just for compatibility, will be deperecate
	    maximumTrackStyle: _propTypes2['default'].object, // just for compatibility, will be deperecate
	    handleStyle: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].arrayOf(_propTypes2['default'].object)]),
	    trackStyle: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].arrayOf(_propTypes2['default'].object)]),
	    railStyle: _propTypes2['default'].object,
	    dotStyle: _propTypes2['default'].object,
	    activeDotStyle: _propTypes2['default'].object
	  }), _class.defaultProps = (0, _extends3['default'])({}, Component.defaultProps, {
	    prefixCls: 'rc-slider',
	    className: '',
	    min: 0,
	    max: 100,
	    step: 1,
	    marks: {},
	    handle: function handle(_ref) {
	      var index = _ref.index,
	          restProps = (0, _objectWithoutProperties3['default'])(_ref, ['index']);

	      delete restProps.dragging;
	      return _react2['default'].createElement(_Handle2['default'], (0, _extends3['default'])({}, restProps, { key: index }));
	    },

	    onBeforeChange: noop,
	    onChange: noop,
	    onAfterChange: noop,
	    included: true,
	    disabled: false,
	    dots: false,
	    vertical: false,
	    trackStyle: [{}],
	    handleStyle: [{}],
	    railStyle: {},
	    dotStyle: {},
	    activeDotStyle: {}
	  }), _temp;
	}