function OperationWrapper() {
                    var _ref;
                    var _temp, _this, _ret;
                    (0, _classCallCheck3.default)(this, OperationWrapper);
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key]
                    }
                    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = OperationWrapper.__proto__ || (0, _getPrototypeOf2.default)(OperationWrapper)).call.apply(_ref, [this].concat(args))), _this), _this.onLoad = function(ref) {
                        var operation = _this.props.operation;
                        var _operation$toObject = operation.toObject(),
                            tag = _operation$toObject.tag,
                            operationId = _operation$toObject.operationId;
                        var isShownKey = ["operations", tag, operationId];
                        system.layoutActions.readyToScroll(isShownKey, ref)
                    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret)
                }