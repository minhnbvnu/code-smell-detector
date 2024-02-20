function Models() {
                var _ref;
                var _temp, _this, _ret;
                (0, _classCallCheck3.default)(this, Models);
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key]
                }
                return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Models.__proto__ || (0, _getPrototypeOf2.default)(Models)).call.apply(_ref, [this].concat(args))), _this), _this.getSchemaBasePath = function() {
                    var isOAS3 = _this.props.specSelectors.isOAS3();
                    return isOAS3 ? ["components", "schemas"] : ["definitions"]
                }, _this.getCollapsedContent = function() {
                    return " "
                }, _this.handleToggle = function(name, isExpanded) {
                    var layoutActions = _this.props.layoutActions;
                    layoutActions.show(["models", name], isExpanded);
                    if (isExpanded) {
                        _this.props.specActions.requestResolvedSubtree([].concat((0, _toConsumableArray3.default)(_this.getSchemaBasePath()), [name]))
                    }
                }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret)
            }