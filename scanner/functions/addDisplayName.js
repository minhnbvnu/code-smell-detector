function addDisplayName(id, call) {
	    var props = call.arguments[0].properties;
	    var safe = true;

	    for (var i = 0; i < props.length; i++) {
	      var prop = props[i];
	      var key = t.toComputedKey(prop);
	      if (t.isLiteral(key, { value: "displayName" })) {
	        safe = false;
	        break;
	      }
	    }

	    if (safe) {
	      props.unshift(t.objectProperty(t.identifier("displayName"), t.stringLiteral(id)));
	    }
	  }