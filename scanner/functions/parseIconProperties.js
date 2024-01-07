function parseIconProperties(
  style,
  builder,
  uniforms,
  vertContext,
  fragContext,
) {
  // COLOR
  let color = 'vec4(1.0)';
  if ('icon-color' in style) {
    color = expressionToGlsl(fragContext, style['icon-color'], ColorType);
  }

  // OPACITY
  if ('icon-opacity' in style) {
    color = `${color} * ${expressionToGlsl(
      fragContext,
      style['icon-opacity'],
      NumberType,
    )}`;
  }

  // IMAGE & SIZE
  const textureId = computeHash(style['icon-src']);
  const sizeExpression = parseImageProperties(
    style,
    builder,
    uniforms,
    'icon-',
    textureId,
  );
  builder
    .setSymbolColorExpression(
      `${color} * samplePremultiplied(u_texture${textureId}, v_texCoord)`,
    )
    .setSymbolSizeExpression(sizeExpression);

  // override size if width/height were specified
  if ('icon-width' in style && 'icon-height' in style) {
    builder.setSymbolSizeExpression(
      `vec2(${expressionToGlsl(
        vertContext,
        style['icon-width'],
        NumberType,
      )}, ${expressionToGlsl(vertContext, style['icon-height'], NumberType)})`,
    );
  }

  // tex coord
  if ('icon-offset' in style && 'icon-size' in style) {
    const sampleSize = expressionToGlsl(
      vertContext,
      style['icon-size'],
      NumberArrayType,
    );
    const fullsize = builder.getSymbolSizeExpression();
    builder.setSymbolSizeExpression(sampleSize);
    const offset = parseImageOffsetProperties(
      style,
      'icon-',
      vertContext,
      'v_quadSizePx',
      sampleSize,
    );
    builder.setTextureCoordinateExpression(
      `(vec4((${offset}).xyxy) + vec4(0., 0., ${sampleSize})) / (${fullsize}).xyxy`,
    );
  }

  parseCommonSymbolProperties(style, builder, vertContext, 'icon-');

  if ('icon-anchor' in style) {
    const anchor = expressionToGlsl(
      vertContext,
      style['icon-anchor'],
      NumberArrayType,
    );
    let scale = `1.0`;
    if (`icon-scale` in style) {
      scale = expressionToGlsl(
        vertContext,
        style[`icon-scale`],
        NumberType | NumberArrayType,
      );
    }
    let shiftPx;
    if (
      style['icon-anchor-x-units'] === 'pixels' &&
      style['icon-anchor-y-units'] === 'pixels'
    ) {
      shiftPx = `${anchor} * ${scale}`;
    } else if (style['icon-anchor-x-units'] === 'pixels') {
      shiftPx = `${anchor} * vec2(vec2(${scale}).x, v_quadSizePx.y)`;
    } else if (style['icon-anchor-y-units'] === 'pixels') {
      shiftPx = `${anchor} * vec2(v_quadSizePx.x, vec2(${scale}).x)`;
    } else {
      shiftPx = `${anchor} * v_quadSizePx`;
    }
    // default origin is top-left
    let offsetPx = `v_quadSizePx * vec2(0.5, -0.5) + ${shiftPx} * vec2(-1., 1.)`;
    if ('icon-anchor-origin' in style) {
      switch (style['icon-anchor-origin']) {
        case 'top-right':
          offsetPx = `v_quadSizePx * -0.5 + ${shiftPx}`;
          break;
        case 'bottom-left':
          offsetPx = `v_quadSizePx * 0.5 - ${shiftPx}`;
          break;
        case 'bottom-right':
          offsetPx = `v_quadSizePx * vec2(-0.5, 0.5) + ${shiftPx} * vec2(1., -1.)`;
          break;
        default: // pass
      }
    }
    builder.setSymbolOffsetExpression(
      `${builder.getSymbolOffsetExpression()} + ${offsetPx}`,
    );
  }
}