function JsonSchema_string() {
                var _ref;
                var _temp, _this2, _ret;
                (0, _classCallCheck3.default)(this, JsonSchema_string);
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key]
                }
                return _ret = (_temp = (_this2 = (0, _possibleConstructorReturn3.default)(this, (_ref = JsonSchema_string.__proto__ || (0, _getPrototypeOf2.default)(JsonSchema_string)).call.apply(_ref, [this].concat(args))), _this2), _this2.onChange = function(e) {
                    var value = _this2.props.schema["type"] === "file" ? e.target.files[0] : e.target.value;
                    _this2.props.onChange(value, _this2.props.keyName)
                }, _this2.onEnumChange = function(val) {
                    return _this2.props.onChange(val)
                }, _temp), (0, _possibleConstructorReturn3.default)(_this2, _ret)
            }