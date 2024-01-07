function getTypeFromHint(typeHint) {
  switch (typeHint) {
    case 'string':
      return StringType;
    case 'color':
      return ColorType;
    case 'number':
      return NumberType;
    case 'boolean':
      return BooleanType;
    case 'number[]':
      return NumberArrayType;
    default:
      throw new Error(`Unrecognized type hint: ${typeHint}`);
  }
}