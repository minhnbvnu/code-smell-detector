function ActionButton(props) {
	        (0, _classCallCheck3['default'])(this, ActionButton);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (ActionButton.__proto__ || Object.getPrototypeOf(ActionButton)).call(this, props));

	        _this.onClick = function () {
	            var _this$props = _this.props,
	                actionFn = _this$props.actionFn,
	                closeModal = _this$props.closeModal;

	            if (actionFn) {
	                var ret = void 0;
	                if (actionFn.length) {
	                    ret = actionFn(closeModal);
	                } else {
	                    ret = actionFn();
	                    if (!ret) {
	                        closeModal();
	                    }
	                }
	                if (ret && ret.then) {
	                    _this.setState({ loading: true });
	                    ret.then(function () {
	                        // It's unnecessary to set loading=false, for the Modal will be unmounted after close.
	                        // this.setState({ loading: false });
	                        closeModal.apply(undefined, arguments);
	                    }, function () {
	                        // See: https://github.com/ant-design/ant-design/issues/6183
	                        _this.setState({ loading: false });
	                    });
	                }
	            } else {
	                closeModal();
	            }
	        };
	        _this.state = {
	            loading: false
	        };
	        return _this;
	    }