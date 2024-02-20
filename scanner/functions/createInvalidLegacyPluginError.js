function createInvalidLegacyPluginError(message, pluginType, pluginId) {
	  switch (pluginType) {
	    case 'reporter':
	      return createInvalidReporterError(message, pluginId);

	    case 'ui':
	      return createInvalidInterfaceError(message, pluginId);

	    default:
	      throw new Error('unknown pluginType "' + pluginType + '"');
	  }
	}