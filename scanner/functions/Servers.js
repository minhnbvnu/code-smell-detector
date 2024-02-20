function Servers() {
                var _ref;
                var _temp, _this, _ret;
                (0, _classCallCheck3.default)(this, Servers);
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key]
                }
                return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Servers.__proto__ || (0, _getPrototypeOf2.default)(Servers)).call.apply(_ref, [this].concat(args))), _this), _this.onServerChange = function(e) {
                    _this.setServer(e.target.value)
                }, _this.onServerVariableValueChange = function(e) {
                    var _this$props = _this.props,
                        setServerVariableValue = _this$props.setServerVariableValue,
                        currentServer = _this$props.currentServer;
                    var variableName = e.target.getAttribute("data-variable");
                    var newVariableValue = e.target.value;
                    if (typeof setServerVariableValue === "function") {
                        setServerVariableValue({
                            server: currentServer,
                            key: variableName,
                            val: newVariableValue
                        })
                    }
                }, _this.setServer = function(value) {
                    var setSelectedServer = _this.props.setSelectedServer;
                    setSelectedServer(value)
                }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret)
            }