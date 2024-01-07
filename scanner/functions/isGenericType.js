function isGenericType(genericName) {
	  var type = this.getTypeAnnotation();
	  return t.isGenericTypeAnnotation(type) && t.isIdentifier(type.id, { name: genericName });
	}