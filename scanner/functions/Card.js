function Card() {
	        (0, _classCallCheck3["default"])(this, Card);

	        var _this = (0, _possibleConstructorReturn3["default"])(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));

	        _this.state = {
	            widerPadding: false
	        };
	        _this.saveRef = function (node) {
	            _this.container = node;
	        };
	        return _this;
	    }