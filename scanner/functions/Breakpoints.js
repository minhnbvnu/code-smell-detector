function Breakpoints(slider) {
		_classCallCheck(this, Breakpoints);

		this.slider = slider;
		this.options = slider.options;

		this[onResize] = this[onResize].bind(this);

		this._bindEvents();
	}