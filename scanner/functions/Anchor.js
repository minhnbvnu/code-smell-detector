function Anchor(props) {
	        (0, _classCallCheck3['default'])(this, Anchor);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (Anchor.__proto__ || Object.getPrototypeOf(Anchor)).call(this, props));

	        _this.handleScroll = function () {
	            if (_this.animating) {
	                return;
	            }
	            var _this$props = _this.props,
	                offsetTop = _this$props.offsetTop,
	                bounds = _this$props.bounds;

	            _this.setState({
	                activeLink: _this.getCurrentAnchor(offsetTop, bounds)
	            });
	        };
	        _this.handleScrollTo = function (link) {
	            var _this$props2 = _this.props,
	                offsetTop = _this$props2.offsetTop,
	                _this$props2$target = _this$props2.target,
	                target = _this$props2$target === undefined ? getDefaultTarget : _this$props2$target;

	            _this.animating = true;
	            _this.setState({ activeLink: link });
	            scrollTo(link, offsetTop, target, function () {
	                _this.animating = false;
	            });
	        };
	        _this.updateInk = function () {
	            if (typeof document === 'undefined') {
	                return;
	            }
	            var prefixCls = _this.props.prefixCls;

	            var linkNode = _reactDom2['default'].findDOMNode(_this).getElementsByClassName(prefixCls + '-link-title-active')[0];
	            if (linkNode) {
	                _this.refs.ink.style.top = linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5 + 'px';
	            }
	        };
	        _this.state = {
	            activeLink: null
	        };
	        _this.links = [];
	        return _this;
	    }