function BackTop(props) {
	        (0, _classCallCheck3['default'])(this, BackTop);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (BackTop.__proto__ || Object.getPrototypeOf(BackTop)).call(this, props));

	        _this.getCurrentScrollTop = function () {
	            var getTarget = _this.props.target || getDefaultTarget;
	            var targetNode = getTarget();
	            if (targetNode === window) {
	                return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
	            }
	            return targetNode.scrollTop;
	        };
	        _this.scrollToTop = function (e) {
	            var scrollTop = _this.getCurrentScrollTop();
	            var startTime = Date.now();
	            var frameFunc = function frameFunc() {
	                var timestamp = Date.now();
	                var time = timestamp - startTime;
	                _this.setScrollTop(easeInOutCubic(time, scrollTop, 0, 450));
	                if (time < 450) {
	                    reqAnimFrame(frameFunc);
	                }
	            };
	            reqAnimFrame(frameFunc);
	            (_this.props.onClick || noop)(e);
	        };
	        _this.handleScroll = function () {
	            var _this$props = _this.props,
	                visibilityHeight = _this$props.visibilityHeight,
	                _this$props$target = _this$props.target,
	                target = _this$props$target === undefined ? getDefaultTarget : _this$props$target;

	            var scrollTop = (0, _getScroll2['default'])(target(), true);
	            _this.setState({
	                visible: scrollTop > visibilityHeight
	            });
	        };
	        _this.state = {
	            visible: false
	        };
	        return _this;
	    }