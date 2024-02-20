function OnlineValidatorBadge(props, context) {
                (0, _classCallCheck3.default)(this, OnlineValidatorBadge);
                var _this = (0, _possibleConstructorReturn3.default)(this, (OnlineValidatorBadge.__proto__ || (0, _getPrototypeOf2.default)(OnlineValidatorBadge)).call(this, props, context));
                _this.getDefinitionUrl = function() {
                    var specSelectors = _this.props.specSelectors;
                    var urlObject = new _urlParse2.default(specSelectors.url(), _window2.default.location);
                    return urlObject.toString()
                };
                var getConfigs = props.getConfigs;
                var _getConfigs = getConfigs(),
                    validatorUrl = _getConfigs.validatorUrl;
                _this.state = {
                    url: _this.getDefinitionUrl(),
                    validatorUrl: validatorUrl === undefined ? "https://online.swagger.io/validator" : validatorUrl
                };
                return _this
            }