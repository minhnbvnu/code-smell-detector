function parseCommonSymbolProperties(style, builder, vertContext, prefix) {
  if (`${prefix}radius` in style && prefix !== 'icon-') {
    let radius = expressionToGlsl(
      vertContext,
      style[`${prefix}radius`],
      NumberType,
    );
    if (`${prefix}radius2` in style) {
      const radius2 = expressionToGlsl(
        vertContext,
        style[`${prefix}radius2`],
        NumberType,
      );
      radius = `max(${radius}, ${radius2})`;
    }
    if (`${prefix}stroke-width` in style) {
      radius = `(${radius} + ${expressionToGlsl(
        vertContext,
        style[`${prefix}stroke-width`],
        NumberType,
      )} * 0.5)`;
    }
    builder.setSymbolSizeExpression(`vec2(${radius} * 2. + 0.5)`); // adding some padding for antialiasing
  }
  if (`${prefix}scale` in style) {
    const scale = expressionToGlsl(
      vertContext,
      style[`${prefix}scale`],
      NumberType | NumberArrayType,
    );
    builder.setSymbolSizeExpression(
      `${builder.getSymbolSizeExpression()} * ${scale}`,
    );
  }
  if (`${prefix}displacement` in style) {
    builder.setSymbolOffsetExpression(
      expressionToGlsl(
        vertContext,
        style[`${prefix}displacement`],
        NumberArrayType,
      ),
    );
  }
  if (`${prefix}rotation` in style) {
    builder.setSymbolRotationExpression(
      expressionToGlsl(vertContext, style[`${prefix}rotation`], NumberType),
    );
  }
  if (`${prefix}rotate-with-view` in style) {
    builder.setSymbolRotateWithView(!!style[`${prefix}rotate-with-view`]);
  }
}