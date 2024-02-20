function Transitioner(slider) {
		_classCallCheck(this, Transitioner);

		this.slider = slider;
		this.options = slider.options;

		this._animating = false;
		this._animation = undefined;

		this._translate = new __WEBPACK_IMPORTED_MODULE_1__transitions_translate__["a" /* default */](this, slider, slider.options);
		this._fade = new __WEBPACK_IMPORTED_MODULE_0__transitions_fade__["a" /* default */](this, slider, slider.options);
	}