function Oauth2(props, context) {
                (0, _classCallCheck3.default)(this, Oauth2);
                var _this = (0, _possibleConstructorReturn3.default)(this, (Oauth2.__proto__ || (0, _getPrototypeOf2.default)(Oauth2)).call(this, props, context));
                _initialiseProps.call(_this);
                var _this$props = _this.props,
                    name = _this$props.name,
                    schema = _this$props.schema,
                    authorized = _this$props.authorized,
                    authSelectors = _this$props.authSelectors;
                var auth = authorized && authorized.get(name);
                var authConfigs = authSelectors.getConfigs() || {};
                var username = auth && auth.get("username") || "";
                var clientId = auth && auth.get("clientId") || authConfigs.clientId || "";
                var clientSecret = auth && auth.get("clientSecret") || authConfigs.clientSecret || "";
                var passwordType = auth && auth.get("passwordType") || "request-body";
                _this.state = {
                    appName: authConfigs.appName,
                    name: name,
                    schema: schema,
                    scopes: [],
                    clientId: clientId,
                    clientSecret: clientSecret,
                    username: username,
                    password: "",
                    passwordType: passwordType
                };
                return _this
            }