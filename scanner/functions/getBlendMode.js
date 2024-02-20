function getBlendMode(obj) {
  // Limitation: returns first found blending mode, ignores any others that
  //   might be applied a parent object
  while (obj && obj.typename != 'Document') {
    if (obj.blendingMode && obj.blendingMode != BlendModes.NORMAL) {
      return obj.blendingMode;
    }
    obj = obj.parent;
  }
  return null;
}