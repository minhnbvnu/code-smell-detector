function Sider(props) {
	        (0, _classCallCheck3['default'])(this, Sider);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (Sider.__proto__ || Object.getPrototypeOf(Sider)).call(this, props));

	        _this.responsiveHandler = function (mql) {
	            _this.setState({ below: mql.matches });
	            if (_this.state.collapsed !== mql.matches) {
	                _this.setCollapsed(mql.matches, 'responsive');
	            }
	        };
	        _this.setCollapsed = function (collapsed, type) {
	            if (!('collapsed' in _this.props)) {
	                _this.setState({
	                    collapsed: collapsed
	                });
	            }
	            var onCollapse = _this.props.onCollapse;

	            if (onCollapse) {
	                onCollapse(collapsed, type);
	            }
	        };
	        _this.toggle = function () {
	            var collapsed = !_this.state.collapsed;
	            _this.setCollapsed(collapsed, 'clickTrigger');
	        };
	        _this.belowShowChange = function () {
	            _this.setState({ belowShow: !_this.state.belowShow });
	        };
	        _this.uniqueId = generateId('ant-sider-');
	        var matchMedia = void 0;
	        if (typeof window !== 'undefined') {
	            matchMedia = window.matchMedia;
	        }
	        if (matchMedia && props.breakpoint && props.breakpoint in dimensionMap) {
	            _this.mql = matchMedia('(max-width: ' + dimensionMap[props.breakpoint] + ')');
	        }
	        var collapsed = void 0;
	        if ('collapsed' in props) {
	            collapsed = props.collapsed;
	        } else {
	            collapsed = props.defaultCollapsed;
	        }
	        _this.state = {
	            collapsed: collapsed,
	            below: false
	        };
	        return _this;
	    }