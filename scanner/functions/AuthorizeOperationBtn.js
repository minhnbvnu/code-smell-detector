function AuthorizeOperationBtn() {
                var _ref;
                var _temp, _this, _ret;
                (0, _classCallCheck3.default)(this, AuthorizeOperationBtn);
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key]
                }
                return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AuthorizeOperationBtn.__proto__ || (0, _getPrototypeOf2.default)(AuthorizeOperationBtn)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function(e) {
                    e.stopPropagation();
                    var onClick = _this.props.onClick;
                    if (onClick) {
                        onClick()
                    }
                }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret)
            }