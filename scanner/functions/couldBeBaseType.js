function couldBeBaseType(name) {
  const type = this.getTypeAnnotation();
  if (t.isAnyTypeAnnotation(type)) return true;

  if (t.isUnionTypeAnnotation(type)) {
    for (const type2 of type.types) {
      if (t.isAnyTypeAnnotation(type2) || _isBaseType(name, type2, true)) {
        return true;
      }
    }

    return false;
  } else {
    return _isBaseType(name, type, true);
  }
}