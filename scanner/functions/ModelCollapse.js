function ModelCollapse(props, context) {
                (0, _classCallCheck3.default)(this, ModelCollapse);
                var _this = (0, _possibleConstructorReturn3.default)(this, (ModelCollapse.__proto__ || (0, _getPrototypeOf2.default)(ModelCollapse)).call(this, props, context));
                _this.toggleCollapsed = function() {
                    if (_this.props.onToggle) {
                        _this.props.onToggle(_this.props.modelName, !_this.state.expanded)
                    }
                    _this.setState({
                        expanded: !_this.state.expanded
                    })
                };
                var _this$props = _this.props,
                    expanded = _this$props.expanded,
                    collapsedContent = _this$props.collapsedContent;
                _this.state = {
                    expanded: expanded,
                    collapsedContent: collapsedContent || ModelCollapse.defaultProps.collapsedContent
                };
                return _this
            }