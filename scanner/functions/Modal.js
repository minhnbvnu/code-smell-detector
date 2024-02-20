function Modal() {
	        (0, _classCallCheck3['default'])(this, Modal);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).apply(this, arguments));

	        _this.handleCancel = function (e) {
	            var onCancel = _this.props.onCancel;
	            if (onCancel) {
	                onCancel(e);
	            }
	        };
	        _this.handleOk = function (e) {
	            var onOk = _this.props.onOk;
	            if (onOk) {
	                onOk(e);
	            }
	        };
	        return _this;
	    }