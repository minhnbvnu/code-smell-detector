function Carousel(props) {
	        (0, _classCallCheck3['default'])(this, Carousel);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, props));

	        _this.onWindowResized = function () {
	            // Fix https://github.com/ant-design/ant-design/issues/2550
	            var slick = _this.refs.slick;
	            var autoplay = _this.props.autoplay;

	            if (autoplay && slick && slick.innerSlider && slick.innerSlider.autoPlay) {
	                slick.innerSlider.autoPlay();
	            }
	        };
	        _this.onWindowResized = (0, _lodash2['default'])(_this.onWindowResized, 500, {
	            leading: false
	        });
	        return _this;
	    }