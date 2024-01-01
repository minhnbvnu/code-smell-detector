function isRawProperty (data) {
  return data.isRawProperty || data.property.startsWith(STRING_COMPONENTS) ||
         data.property.startsWith(STRING_OBJECT3D);
}