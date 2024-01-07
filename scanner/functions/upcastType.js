function upcastType(typeA, typeB) {
	  if (typeA === 'string' || typeB === 'string') {
	    if (typeA === 'string' && typeB === 'string') {
	      return 'string';
	    }

	    throw new Error("Can not upcast " + typeA + " with " + typeB);
	  }

	  return upcastTypeMap[typeA][typeB];
	}