function createInvalidPluginError() {
	  deprecate('Use createInvalidLegacyPluginError() instead');
	  return createInvalidLegacyPluginError.apply(void 0, arguments);
	}