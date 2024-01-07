function parsePaletteArgs(encoded, context) {
  const index = parse(encoded[1], context, NumberType);
  if (index.type !== NumberType) {
    throw new Error(
      `The first argument of palette must be an number, got ${typeName(
        index.type,
      )} instead`,
    );
  }
  const colors = encoded[2];
  if (!Array.isArray(colors)) {
    throw new Error('The second argument of palette must be an array');
  }
  const parsedColors = new Array(colors.length);
  for (let i = 0; i < parsedColors.length; i++) {
    const color = parse(colors[i], context, ColorType);
    if (!(color instanceof LiteralExpression)) {
      throw new Error(
        `The palette color at index ${i} must be a literal value`,
      );
    }
    if (!overlapsType(color.type, ColorType)) {
      throw new Error(
        `The palette color at index ${i} should be of type color, got ${typeName(
          color.type,
        )} instead`,
      );
    }
    parsedColors[i] = color;
  }
  return [index, ...parsedColors];
}