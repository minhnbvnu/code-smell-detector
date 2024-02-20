function OperationServers() {
                var _ref;
                var _temp, _this, _ret;
                (0, _classCallCheck3.default)(this, OperationServers);
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key]
                }
                return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = OperationServers.__proto__ || (0, _getPrototypeOf2.default)(OperationServers)).call.apply(_ref, [this].concat(args))), _this), _this.setSelectedServer = function(server) {
                    var _this$props = _this.props,
                        path = _this$props.path,
                        method = _this$props.method;
                    _this.forceUpdate();
                    return _this.props.setSelectedServer(server, path + ":" + method)
                }, _this.setServerVariableValue = function(obj) {
                    var _this$props2 = _this.props,
                        path = _this$props2.path,
                        method = _this$props2.method;
                    _this.forceUpdate();
                    return _this.props.setServerVariableValue((0, _extends3.default)({}, obj, {
                        namespace: path + ":" + method
                    }))
                }, _this.getSelectedServer = function() {
                    var _this$props3 = _this.props,
                        path = _this$props3.path,
                        method = _this$props3.method;
                    return _this.props.getSelectedServer(path + ":" + method)
                }, _this.getServerVariable = function(server, key) {
                    var _this$props4 = _this.props,
                        path = _this$props4.path,
                        method = _this$props4.method;
                    return _this.props.getServerVariable({
                        namespace: path + ":" + method,
                        server: server
                    }, key)
                }, _this.getEffectiveServerValue = function(server) {
                    var _this$props5 = _this.props,
                        path = _this$props5.path,
                        method = _this$props5.method;
                    return _this.props.getEffectiveServerValue({
                        server: server,
                        namespace: path + ":" + method
                    })
                }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret)
            }