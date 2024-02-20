function isBaseType(baseName, soft) {
  return _isBaseType(baseName, this.getTypeAnnotation(), soft);
}