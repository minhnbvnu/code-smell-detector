function AnchorLink() {
	        (0, _classCallCheck3['default'])(this, AnchorLink);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (AnchorLink.__proto__ || Object.getPrototypeOf(AnchorLink)).apply(this, arguments));

	        _this.handleClick = function () {
	            _this.context.antAnchor.scrollTo(_this.props.href);
	        };
	        return _this;
	    }