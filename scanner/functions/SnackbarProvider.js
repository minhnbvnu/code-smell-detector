function SnackbarProvider() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SnackbarProvider);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SnackbarProvider.__proto__ || Object.getPrototypeOf(SnackbarProvider)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            snacks: []
        }, _this.queue = [], _this.handlePresentSnackbar = function (variant, message) {
            if (process.env.NODE_ENV !== 'production') {
                /* eslint-disable no-console */
                console.warn('DEPRECATED - notistack: method \'onPresentSnackbar\' has  been  deprecated and will be removed in future versions of notistack. Please use \'enqueueSnackbar\' method instead. see https://github.com/iamhosseindhv/notistack#withsnackbar for more info.');
            }
            _this.queue.push({
                message: message,
                variant: variant,
                open: true,
                key: new Date().getTime() + Math.random()
            });
            _this.handleDisplaySnack();
        }, _this.handleEnqueueSnackbar = function (message, _ref2) {
            var key = _ref2.key,
                options = _objectWithoutProperties(_ref2, ['key']);

            var id = key || new Date().getTime() + Math.random();
            _this.queue.push(_extends({
                key: id,
                message: message
            }, options, {
                open: true
            }));

            _this.handleDisplaySnack();
            return id;
        }, _this.handleDisplaySnack = function () {
            var maxSnack = _this.props.maxSnack;
            var snacks = _this.state.snacks;

            if (snacks.length >= maxSnack) {
                return _this.handleDismissOldest();
            }
            return _this.processQueue();
        }, _this.processQueue = function () {
            if (_this.queue.length > 0) {
                var newOne = _this.queue.shift();
                _this.setState(function (_ref3) {
                    var snacks = _ref3.snacks;
                    return {
                        snacks: [].concat(_toConsumableArray(snacks), [newOne])
                    };
                });
            }
        }, _this.handleDismissOldest = function () {
            _this.setState(function (_ref4) {
                var snacks = _ref4.snacks;
                return {
                    snacks: snacks.filter(function (item) {
                        return item.open === true;
                    }).map(function (item, i) {
                        return i === 0 ? _extends({}, item, { open: false }) : _extends({}, item);
                    })
                };
            });
        }, _this.handleCloseSnack = function (event, reason, key) {
            _this.setState(function (_ref5) {
                var snacks = _ref5.snacks;
                return {
                    snacks: snacks.map(function (item) {
                        return item.key === key ? _extends({}, item, { open: false }) : _extends({}, item);
                    })
                };
            });

            if (_this.props.onClose) _this.props.onClose(event, reason, key);
        }, _this.handleExitedSnack = function (event, key) {
            var enterDelay = _constants.TRANSITION_DELAY + _constants.TRANSITION_DOWN_DURATION + 40;
            _this.setState(function (_ref6) {
                var snacks = _ref6.snacks;
                return {
                    snacks: snacks.filter(function (item) {
                        return item.key !== key;
                    })
                };
            }, function () {
                return setTimeout(_this.handleDisplaySnack, enterDelay);
            });

            if (_this.props.onExited) _this.props.onExited(event, key);
        }, _this.handleSetHeight = function (key, height) {
            _this.setState(function (_ref7) {
                var snacks = _ref7.snacks;
                return {
                    snacks: snacks.map(function (item) {
                        return item.key === key ? _extends({}, item, { height: height }) : _extends({}, item);
                    })
                };
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }