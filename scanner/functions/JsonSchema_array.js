function JsonSchema_array(props, context) {
                (0, _classCallCheck3.default)(this, JsonSchema_array);
                var _this3 = (0, _possibleConstructorReturn3.default)(this, (JsonSchema_array.__proto__ || (0, _getPrototypeOf2.default)(JsonSchema_array)).call(this, props, context));
                _this3.onChange = function() {
                    return _this3.props.onChange(_this3.state.value)
                };
                _this3.onItemChange = function(itemVal, i) {
                    _this3.setState(function(state) {
                        return {
                            value: state.value.set(i, itemVal)
                        }
                    }, _this3.onChange)
                };
                _this3.removeItem = function(i) {
                    _this3.setState(function(state) {
                        return {
                            value: state.value.remove(i)
                        }
                    }, _this3.onChange)
                };
                _this3.addItem = function() {
                    _this3.setState(function(state) {
                        state.value = valueOrEmptyList(state.value);
                        return {
                            value: state.value.push("")
                        }
                    }, _this3.onChange)
                };
                _this3.onEnumChange = function(value) {
                    _this3.setState(function() {
                        return {
                            value: value
                        }
                    }, _this3.onChange)
                };
                _this3.state = {
                    value: valueOrEmptyList(props.value)
                };
                return _this3
            }