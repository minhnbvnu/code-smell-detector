function Alert(props) {
	        (0, _classCallCheck3['default'])(this, Alert);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).call(this, props));

	        _this.handleClose = function (e) {
	            e.preventDefault();
	            var dom = _reactDom2['default'].findDOMNode(_this);
	            dom.style.height = dom.offsetHeight + 'px';
	            // Magic code
	            // 重复一次后才能正确设置 height
	            dom.style.height = dom.offsetHeight + 'px';
	            _this.setState({
	                closing: false
	            });
	            (_this.props.onClose || noop)(e);
	        };
	        _this.animationEnd = function () {
	            _this.setState({
	                closed: true,
	                closing: true
	            });
	        };
	        _this.state = {
	            closing: true,
	            closed: false
	        };
	        return _this;
	    }