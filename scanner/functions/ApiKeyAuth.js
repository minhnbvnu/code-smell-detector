function ApiKeyAuth(props, context) {
                (0, _classCallCheck3.default)(this, ApiKeyAuth);
                var _this = (0, _possibleConstructorReturn3.default)(this, (ApiKeyAuth.__proto__ || (0, _getPrototypeOf2.default)(ApiKeyAuth)).call(this, props, context));
                _initialiseProps.call(_this);
                var _this$props = _this.props,
                    name = _this$props.name,
                    schema = _this$props.schema;
                var value = _this.getValue();
                _this.state = {
                    name: name,
                    schema: schema,
                    value: value
                };
                return _this
            }