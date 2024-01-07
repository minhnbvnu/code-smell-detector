function toSnakeCase(name) {
	  var intermediate = name.replace(/(.)([A-Z][a-z0-9]+)/g, '$1_$2');
	  var insecure = intermediate.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
	  /*
	   If the class is private the name starts with "_" which is not secure
	   for creating scopes. We prefix the name with "private" in this case.
	   */

	  if (insecure[0] !== '_') {
	    return insecure;
	  }

	  return 'private' + insecure;
	}