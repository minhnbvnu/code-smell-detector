function OperationTagWrapper() {
                    var _ref;
                    var _temp, _this, _ret;
                    (0, _classCallCheck3.default)(this, OperationTagWrapper);
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key]
                    }
                    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = OperationTagWrapper.__proto__ || (0, _getPrototypeOf2.default)(OperationTagWrapper)).call.apply(_ref, [this].concat(args))), _this), _this.onLoad = function(ref) {
                        var tag = _this.props.tag;
                        var isShownKey = ["operations-tag", tag];
                        system.layoutActions.readyToScroll(isShownKey, ref)
                    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret)
                }