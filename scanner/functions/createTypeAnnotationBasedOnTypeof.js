function createTypeAnnotationBasedOnTypeof(type) {
	  if (type === "string") {
	    return t.stringTypeAnnotation();
	  } else if (type === "number") {
	    return t.numberTypeAnnotation();
	  } else if (type === "undefined") {
	    return t.voidTypeAnnotation();
	  } else if (type === "boolean") {
	    return t.booleanTypeAnnotation();
	  } else if (type === "function") {
	    return t.genericTypeAnnotation(t.identifier("Function"));
	  } else if (type === "object") {
	    return t.genericTypeAnnotation(t.identifier("Object"));
	  } else if (type === "symbol") {
	    return t.genericTypeAnnotation(t.identifier("Symbol"));
	  } else {
	    throw new Error("Invalid typeof value");
	  }
	}