function Responses() {
                var _ref;
                var _temp, _this, _ret;
                (0, _classCallCheck3.default)(this, Responses);
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key]
                }
                return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Responses.__proto__ || (0, _getPrototypeOf2.default)(Responses)).call.apply(_ref, [this].concat(args))), _this), _this.onChangeProducesWrapper = function(val) {
                    return _this.props.specActions.changeProducesValue([_this.props.path, _this.props.method], val)
                }, _this.onResponseContentTypeChange = function(_ref2) {
                    var controlsAcceptHeader = _ref2.controlsAcceptHeader,
                        value = _ref2.value;
                    var _this$props = _this.props,
                        oas3Actions = _this$props.oas3Actions,
                        path = _this$props.path,
                        method = _this$props.method;
                    if (controlsAcceptHeader) {
                        oas3Actions.setResponseContentType({
                            value: value,
                            path: path,
                            method: method
                        })
                    }
                }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret)
            }