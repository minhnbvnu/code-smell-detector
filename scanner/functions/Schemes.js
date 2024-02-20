function Schemes() {
                var _ref;
                var _temp, _this, _ret;
                (0, _classCallCheck3.default)(this, Schemes);
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key]
                }
                return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Schemes.__proto__ || (0, _getPrototypeOf2.default)(Schemes)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function(e) {
                    _this.setScheme(e.target.value)
                }, _this.setScheme = function(value) {
                    var _this$props = _this.props,
                        path = _this$props.path,
                        method = _this$props.method,
                        specActions = _this$props.specActions;
                    specActions.setScheme(value, path, method)
                }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret)
            }