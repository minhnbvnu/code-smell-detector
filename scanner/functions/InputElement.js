function InputElement() {
	        (0, _classCallCheck3['default'])(this, InputElement);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (InputElement.__proto__ || Object.getPrototypeOf(InputElement)).apply(this, arguments));

	        _this.focus = function () {
	            _this.ele.focus ? _this.ele.focus() : (0, _reactDom.findDOMNode)(_this.ele).focus();
	        };
	        _this.blur = function () {
	            _this.ele.blur ? _this.ele.blur() : (0, _reactDom.findDOMNode)(_this.ele).blur();
	        };
	        _this.saveRef = function (ele) {
	            _this.ele = ele;
	            var childRef = _this.props.children.ref;
	            if (typeof childRef === 'function') {
	                childRef(ele);
	            }
	        };
	        return _this;
	    }