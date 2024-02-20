function OperationContainer(props, context) {
                (0, _classCallCheck3.default)(this, OperationContainer);
                var _this = (0, _possibleConstructorReturn3.default)(this, (OperationContainer.__proto__ || (0, _getPrototypeOf2.default)(OperationContainer)).call(this, props, context));
                _this.toggleShown = function() {
                    var _this$props = _this.props,
                        layoutActions = _this$props.layoutActions,
                        tag = _this$props.tag,
                        operationId = _this$props.operationId,
                        isShown = _this$props.isShown;
                    var resolvedSubtree = _this.getResolvedSubtree();
                    if (!isShown && resolvedSubtree === undefined) {
                        _this.requestResolvedSubtree()
                    }
                    layoutActions.show(["operations", tag, operationId], !isShown)
                };
                _this.onCancelClick = function() {
                    _this.setState({
                        tryItOutEnabled: !_this.state.tryItOutEnabled
                    })
                };
                _this.onTryoutClick = function() {
                    var _this$props2 = _this.props,
                        specActions = _this$props2.specActions,
                        path = _this$props2.path,
                        method = _this$props2.method;
                    _this.setState({
                        tryItOutEnabled: !_this.state.tryItOutEnabled
                    });
                    specActions.clearValidateParams([path, method])
                };
                _this.onExecute = function() {
                    _this.setState({
                        executeInProgress: true
                    })
                };
                _this.getResolvedSubtree = function() {
                    var _this$props3 = _this.props,
                        specSelectors = _this$props3.specSelectors,
                        path = _this$props3.path,
                        method = _this$props3.method,
                        specPath = _this$props3.specPath;
                    if (specPath) {
                        return specSelectors.specResolvedSubtree(specPath.toJS())
                    }
                    return specSelectors.specResolvedSubtree(["paths", path, method])
                };
                _this.requestResolvedSubtree = function() {
                    var _this$props4 = _this.props,
                        specActions = _this$props4.specActions,
                        path = _this$props4.path,
                        method = _this$props4.method,
                        specPath = _this$props4.specPath;
                    if (specPath) {
                        return specActions.requestResolvedSubtree(specPath.toJS())
                    }
                    return specActions.requestResolvedSubtree(["paths", path, method])
                };
                _this.state = {
                    tryItOutEnabled: false,
                    executeInProgress: false
                };
                return _this
            }