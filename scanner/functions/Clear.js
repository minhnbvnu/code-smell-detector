function Clear() {
                var _ref;
                var _temp, _this, _ret;
                (0, _classCallCheck3.default)(this, Clear);
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key]
                }
                return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Clear.__proto__ || (0, _getPrototypeOf2.default)(Clear)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function() {
                    var _this$props = _this.props,
                        specActions = _this$props.specActions,
                        path = _this$props.path,
                        method = _this$props.method;
                    specActions.clearResponse(path, method);
                    specActions.clearRequest(path, method)
                }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret)
            }