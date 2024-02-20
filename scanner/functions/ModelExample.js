function ModelExample(props, context) {
                (0, _classCallCheck3.default)(this, ModelExample);
                var _this = (0, _possibleConstructorReturn3.default)(this, (ModelExample.__proto__ || (0, _getPrototypeOf2.default)(ModelExample)).call(this, props, context));
                _this.activeTab = function(e) {
                    var name = e.target.dataset.name;
                    _this.setState({
                        activeTab: name
                    })
                };
                var _this$props = _this.props,
                    getConfigs = _this$props.getConfigs,
                    isExecute = _this$props.isExecute;
                var _getConfigs = getConfigs(),
                    defaultModelRendering = _getConfigs.defaultModelRendering;
                if (defaultModelRendering !== "example" && defaultModelRendering !== "model") {
                    defaultModelRendering = "example"
                }
                _this.state = {
                    activeTab: isExecute ? "example" : defaultModelRendering
                };
                return _this
            }