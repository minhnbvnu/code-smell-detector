function ensureCallbackArrays(obj) {
	  if (obj.enter && !Array.isArray(obj.enter)) obj.enter = [obj.enter];
	  if (obj.exit && !Array.isArray(obj.exit)) obj.exit = [obj.exit];
	}