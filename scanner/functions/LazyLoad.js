function LazyLoad(props) {
	    _classCallCheck(this, LazyLoad);

	    var _this = _possibleConstructorReturn(this, (LazyLoad.__proto__ || Object.getPrototypeOf(LazyLoad)).call(this, props));

	    _this.lazyLoadHandler = _this.lazyLoadHandler.bind(_this);

	    if (props.throttle > 0) {
	      if (props.debounce) {
	        _this.lazyLoadHandler = (0, _lodash2.default)(_this.lazyLoadHandler, props.throttle);
	      } else {
	        _this.lazyLoadHandler = (0, _lodash4.default)(_this.lazyLoadHandler, props.throttle);
	      }
	    }

	    _this.state = { visible: false };
	    return _this;
	  }