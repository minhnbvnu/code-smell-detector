function getVirtualPaths(fieldsMeta) {
	  var virtualPaths = {};
	  Object.keys(fieldsMeta).forEach(function (name) {
	    var leadingName = fieldsMeta[name].leadingName;
	    if (leadingName && fieldsMeta[leadingName].virtual) {
	      if (leadingName in virtualPaths) {
	        virtualPaths[leadingName].push(name);
	      } else {
	        virtualPaths[leadingName] = [name];
	      }
	    }
	  });
	  return virtualPaths;
	}