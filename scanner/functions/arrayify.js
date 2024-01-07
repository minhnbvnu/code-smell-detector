function arrayify(val, mapFn) {
	  if (!val) return [];
	  if (typeof val === "boolean") return arrayify([val], mapFn);
	  if (typeof val === "string") return arrayify(list(val), mapFn);

	  if (Array.isArray(val)) {
	    if (mapFn) val = val.map(mapFn);
	    return val;
	  }

	  return [val];
	}