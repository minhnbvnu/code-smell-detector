function Toolbar(props) {
	        _classCallCheck(this, Toolbar);

	        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

	        var map = {};
	        props.plugins.forEach(function (plugin) {
	            map[plugin.name] = plugin;
	        });
	        _this.pluginsMap = (0, _immutable.Map)(map);
	        _this.state = {
	            editorState: props.editorState,
	            toolbars: []
	        };
	        return _this;
	    }