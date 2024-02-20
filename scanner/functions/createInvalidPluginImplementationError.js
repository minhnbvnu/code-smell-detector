function createInvalidPluginImplementationError(msg) {
	  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      pluginDef = _ref.pluginDef,
	      pluginImpl = _ref.pluginImpl;

	  var err = new Error(msg);
	  err.code = constants$4.INVALID_PLUGIN_IMPLEMENTATION;
	  err.pluginDef = pluginDef;
	  err.pluginImpl = pluginImpl;
	  return err;
	}