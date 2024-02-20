function createInvalidPluginDefinitionError(msg, pluginDef) {
	  var err = new Error(msg);
	  err.code = constants$4.INVALID_PLUGIN_DEFINITION;
	  err.pluginDef = pluginDef;
	  return err;
	}