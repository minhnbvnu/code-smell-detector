function JsonSchema_object() {
                (0, _classCallCheck3.default)(this, JsonSchema_object);
                var _this6 = (0, _possibleConstructorReturn3.default)(this, (JsonSchema_object.__proto__ || (0, _getPrototypeOf2.default)(JsonSchema_object)).call(this));
                _this6.resetValueToSample = function() {
                    _this6.onChange((0, _utils.getSampleSchema)(_this6.props.schema))
                };
                _this6.onChange = function(value) {
                    _this6.props.onChange(value)
                };
                _this6.handleOnChange = function(e) {
                    var inputValue = e.target.value;
                    _this6.onChange(inputValue)
                };
                return _this6
            }