function loadBuiltin(builtinTable, name) {
	  if (isArray(name) && typeof name[0] === 'string') {
	    if (builtinTable.hasOwnProperty(name[0])) {
	      return [builtinTable[name[0]]].concat(name.slice(1));
	    }
	    return;
	  } else if (typeof name === 'string') {
	    return builtinTable[name];
	  }
	  // Could be an actual preset/plugin module
	  return name;
	}