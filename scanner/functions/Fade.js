function Fade(transitioner, slider) {
		var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

		_classCallCheck(this, Fade);

		this.transitioner = transitioner;
		this.slider = slider;
		this.options = _extends({}, options);
	}