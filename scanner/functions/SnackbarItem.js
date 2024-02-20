function SnackbarItem(props) {
        _classCallCheck(this, SnackbarItem);

        var _this = _possibleConstructorReturn(this, (SnackbarItem.__proto__ || Object.getPrototypeOf(SnackbarItem)).call(this, props));

        _this.handleClose = function (key) {
            return function (event, reason) {
                var _this$props = _this.props,
                    onClose = _this$props.onClose,
                    singleOnClose = _this$props.snack.onClose;

                if (reason === 'clickaway') return;
                if (singleOnClose) singleOnClose(event, reason, key);
                onClose(event, reason, key);
            };
        };

        _this.handleExited = function (key) {
            return function (event) {
                var _this$props2 = _this.props,
                    onExited = _this$props2.onExited,
                    singleOnExited = _this$props2.snack.onExited;

                if (singleOnExited) singleOnExited(event, key);
                onExited(event, key);
            };
        };

        _this.componentDidMount = function () {
            var _this$props3 = _this.props,
                onSetHeight = _this$props3.onSetHeight,
                snack = _this$props3.snack;

            var height = _this.ref.current.clientHeight;
            onSetHeight(snack.key, height);
        };

        _this.ref = _react2.default.createRef();
        return _this;
    }