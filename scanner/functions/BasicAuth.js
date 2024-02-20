function BasicAuth(props, context) {
                (0, _classCallCheck3.default)(this, BasicAuth);
                var _this = (0, _possibleConstructorReturn3.default)(this, (BasicAuth.__proto__ || (0, _getPrototypeOf2.default)(BasicAuth)).call(this, props, context));
                _initialiseProps.call(_this);
                var _this$props = _this.props,
                    schema = _this$props.schema,
                    name = _this$props.name;
                var value = _this.getValue();
                var username = value.username;
                _this.state = {
                    name: name,
                    schema: schema,
                    value: !username ? {} : {
                        username: username
                    }
                };
                return _this
            }