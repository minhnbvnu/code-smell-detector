function parseFillProperties(
  style,
  builder,
  uniforms,
  vertContext,
  fragContext,
) {
  if ('fill-color' in style) {
    builder.setFillColorExpression(
      expressionToGlsl(fragContext, style['fill-color'], ColorType),
    );
  }
  if ('fill-pattern-src' in style) {
    const textureId = computeHash(style['fill-pattern-src']);
    const sizeExpression = parseImageProperties(
      style,
      builder,
      uniforms,
      'fill-pattern-',
      textureId,
    );
    let sampleSizeExpression = sizeExpression;
    let offsetExpression = 'vec2(0.)';
    if ('fill-pattern-offset' in style && 'fill-pattern-size' in style) {
      sampleSizeExpression = expressionToGlsl(
        fragContext,
        style[`fill-pattern-size`],
        NumberArrayType,
      );
      offsetExpression = parseImageOffsetProperties(
        style,
        'fill-pattern-',
        fragContext,
        sizeExpression,
        sampleSizeExpression,
      );
    }
    fragContext.functions['sampleFillPattern'] =
      `vec4 sampleFillPattern(sampler2D texture, vec2 textureSize, vec2 textureOffset, vec2 sampleSize, vec2 pxOrigin, vec2 pxPosition) {
  float scaleRatio = pow(2., mod(u_zoom + 0.5, 1.) - 0.5);
  vec2 pxRelativePos = pxPosition - pxOrigin;
  // rotate the relative position from origin by the current view rotation
  pxRelativePos = vec2(pxRelativePos.x * cos(u_rotation) - pxRelativePos.y * sin(u_rotation), pxRelativePos.x * sin(u_rotation) + pxRelativePos.y * cos(u_rotation));
  // sample position is computed according to the sample offset & size
  vec2 samplePos = mod(pxRelativePos / scaleRatio, sampleSize);
  // also make sure that we're not sampling too close to the borders to avoid interpolation with outside pixels
  samplePos = clamp(samplePos, vec2(0.5), sampleSize - vec2(0.5));
  samplePos.y = sampleSize.y - samplePos.y; // invert y axis so that images appear upright
  return samplePremultiplied(texture, (samplePos + textureOffset) / textureSize);
}`;
    const textureName = `u_texture${textureId}`;
    let tintExpression = '1.';
    if ('fill-color' in style) {
      tintExpression = builder.getFillColorExpression();
    }
    builder.setFillColorExpression(
      `${tintExpression} * sampleFillPattern(${textureName}, ${sizeExpression}, ${offsetExpression}, ${sampleSizeExpression}, pxOrigin, pxPos)`,
    );
  }
}