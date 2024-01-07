function serializeKerasObject(instance) {
	  if (instance === null || instance === undefined) {
	    return null;
	  }

	  var dict = {};
	  dict['className'] = instance.getClassName();
	  dict['config'] = instance.getConfig();
	  return dict;
	}