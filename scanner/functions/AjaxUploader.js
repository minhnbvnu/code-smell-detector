function AjaxUploader() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3['default'])(this, AjaxUploader);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = AjaxUploader.__proto__ || Object.getPrototypeOf(AjaxUploader)).call.apply(_ref, [this].concat(args))), _this), _this.state = { uid: (0, _uid2['default'])() }, _this.reqs = {}, _this.onChange = function (e) {
	      var files = e.target.files;
	      _this.uploadFiles(files);
	      _this.reset();
	    }, _this.onClick = function () {
	      var el = _this.fileInput;
	      if (!el) {
	        return;
	      }
	      el.click();
	    }, _this.onKeyDown = function (e) {
	      if (e.key === 'Enter') {
	        _this.onClick();
	      }
	    }, _this.onFileDrop = function (e) {
	      if (e.type === 'dragover') {
	        e.preventDefault();
	        return;
	      }
	      var files = Array.prototype.slice.call(e.dataTransfer.files).filter(function (file) {
	        return (0, _attrAccept2['default'])(file, _this.props.accept);
	      });
	      _this.uploadFiles(files);

	      e.preventDefault();
	    }, _this.saveFileInput = function (node) {
	      _this.fileInput = node;
	    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
	  }