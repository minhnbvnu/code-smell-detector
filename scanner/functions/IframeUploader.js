function IframeUploader() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3['default'])(this, IframeUploader);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = IframeUploader.__proto__ || Object.getPrototypeOf(IframeUploader)).call.apply(_ref, [this].concat(args))), _this), _this.state = { uploading: false }, _this.file = {}, _this.onLoad = function () {
	      if (!_this.state.uploading) {
	        return;
	      }
	      var _this2 = _this,
	          props = _this2.props,
	          file = _this2.file;

	      var response = void 0;
	      try {
	        var doc = _this.getIframeDocument();
	        var script = doc.getElementsByTagName('script')[0];
	        if (script && script.parentNode === doc.body) {
	          doc.body.removeChild(script);
	        }
	        response = doc.body.innerHTML;
	        props.onSuccess(response, file);
	      } catch (err) {
	        (0, _warning2['default'])(false, 'cross domain error for Upload. Maybe server should return document.domain script. see Note from https://github.com/react-component/upload');
	        response = 'cross-domain';
	        props.onError(err, null, file);
	      }
	      _this.endUpload();
	    }, _this.onChange = function () {
	      var target = _this.getFormInputNode();
	      // ie8/9 don't support FileList Object
	      // http://stackoverflow.com/questions/12830058/ie8-input-type-file-get-files
	      var file = _this.file = {
	        uid: (0, _uid2['default'])(),
	        name: target.value
	      };
	      _this.startUpload();
	      var _this3 = _this,
	          props = _this3.props;

	      if (!props.beforeUpload) {
	        return _this.post(file);
	      }
	      var before = props.beforeUpload(file);
	      if (before && before.then) {
	        before.then(function () {
	          _this.post(file);
	        }, function () {
	          _this.endUpload();
	        });
	      } else if (before !== false) {
	        _this.post(file);
	      } else {
	        _this.endUpload();
	      }
	    }, _this.saveIframe = function (node) {
	      _this.iframe = node;
	    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
	  }