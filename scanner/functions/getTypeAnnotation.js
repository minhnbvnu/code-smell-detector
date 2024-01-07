function getTypeAnnotation() {
	  if (this.typeAnnotation) return this.typeAnnotation;

	  var type = this._getTypeAnnotation() || t.anyTypeAnnotation();
	  if (t.isTypeAnnotation(type)) type = type.typeAnnotation;
	  return this.typeAnnotation = type;
	}