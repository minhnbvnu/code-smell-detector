function ParameterRow(props, context) {
                (0, _classCallCheck3.default)(this, ParameterRow);
                var _this = (0, _possibleConstructorReturn3.default)(this, (ParameterRow.__proto__ || (0, _getPrototypeOf2.default)(ParameterRow)).call(this, props, context));
                _this.onChangeWrapper = function(value) {
                    var isXml = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
                    var _this$props = _this.props,
                        onChange = _this$props.onChange,
                        rawParam = _this$props.rawParam;
                    var valueForUpstream = void 0;
                    if (value === "" || value && value.size === 0) {
                        valueForUpstream = null
                    } else {
                        valueForUpstream = value
                    }
                    return onChange(rawParam, valueForUpstream, isXml)
                };
                _this.onChangeIncludeEmpty = function(newValue) {
                    var _this$props2 = _this.props,
                        specActions = _this$props2.specActions,
                        param = _this$props2.param,
                        pathMethod = _this$props2.pathMethod;
                    var paramName = param.get("name");
                    var paramIn = param.get("in");
                    return specActions.updateEmptyParamInclusion(pathMethod, paramName, paramIn, newValue)
                };
                _this.setDefaultValue = function() {
                    var _this$props3 = _this.props,
                        specSelectors = _this$props3.specSelectors,
                        pathMethod = _this$props3.pathMethod,
                        rawParam = _this$props3.rawParam;
                    var paramWithMeta = specSelectors.parameterWithMetaByIdentity(pathMethod, rawParam);
                    if (paramWithMeta.get("value") !== undefined) {
                        return
                    }
                    if (paramWithMeta.get("in") !== "body") {
                        var newValue = void 0;
                        if (specSelectors.isSwagger2()) {
                            newValue = paramWithMeta.get("x-example") || paramWithMeta.getIn(["default"]) || paramWithMeta.getIn(["schema", "example"]) || paramWithMeta.getIn(["schema", "default"])
                        } else if (specSelectors.isOAS3()) {
                            newValue = paramWithMeta.get("example") || paramWithMeta.getIn(["schema", "example"]) || paramWithMeta.getIn(["schema", "default"])
                        }
                        if (newValue !== undefined) {
                            _this.onChangeWrapper((0, _utils.numberToString)(newValue))
                        }
                    }
                };
                _this.setDefaultValue();
                return _this
            }