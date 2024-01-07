function PluginPass(file, plugin) {
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    (0, _classCallCheck3.default)(this, PluginPass);

	    var _this = (0, _possibleConstructorReturn3.default)(this, _Store.call(this));

	    _this.plugin = plugin;
	    _this.key = plugin.key;
	    _this.file = file;
	    _this.opts = options;
	    return _this;
	  }