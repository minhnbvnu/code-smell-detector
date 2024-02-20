function UploadList() {
	        (0, _classCallCheck3['default'])(this, UploadList);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (UploadList.__proto__ || Object.getPrototypeOf(UploadList)).apply(this, arguments));

	        _this.handleClose = function (file) {
	            var onRemove = _this.props.onRemove;

	            if (onRemove) {
	                onRemove(file);
	            }
	        };
	        _this.handlePreview = function (file, e) {
	            var onPreview = _this.props.onPreview;

	            if (!onPreview) {
	                return;
	            }
	            e.preventDefault();
	            return onPreview(file);
	        };
	        return _this;
	    }