function FormItem() {
	        (0, _classCallCheck3['default'])(this, FormItem);

	        // Resolve duplicated ids bug between different forms
	        // https://github.com/ant-design/ant-design/issues/7351
	        var _this = (0, _possibleConstructorReturn3['default'])(this, (FormItem.__proto__ || Object.getPrototypeOf(FormItem)).apply(this, arguments));

	        _this.onLabelClick = function () {
	            var id = _this.props.id || _this.getId();
	            if (!id) {
	                return;
	            }
	            var controls = document.querySelectorAll('[id="' + id + '"]');
	            if (controls.length !== 1) {
	                var control = (0, _reactDom.findDOMNode)(_this).querySelector('[id="' + id + '"]');
	                if (control && control.focus) {
	                    control.focus();
	                }
	            }
	        };
	        return _this;
	    }