function Affix(props) {
	        (0, _classCallCheck3["default"])(this, Affix);

	        var _this = (0, _possibleConstructorReturn3["default"])(this, (Affix.__proto__ || Object.getPrototypeOf(Affix)).call(this, props));

	        _this.events = ['resize', 'scroll', 'touchstart', 'touchmove', 'touchend', 'pageshow', 'load'];
	        _this.eventHandlers = {};
	        _this.state = {
	            affixStyle: null,
	            placeholderStyle: null
	        };
	        return _this;
	    }