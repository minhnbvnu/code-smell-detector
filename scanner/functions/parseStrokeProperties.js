function parseStrokeProperties(
  style,
  builder,
  uniforms,
  vertContext,
  fragContext,
) {
  if ('stroke-color' in style) {
    builder.setStrokeColorExpression(
      expressionToGlsl(fragContext, style['stroke-color'], ColorType),
    );
  }
  if ('stroke-pattern-src' in style) {
    const textureId = computeHash(style['stroke-pattern-src']);
    const sizeExpression = parseImageProperties(
      style,
      builder,
      uniforms,
      'stroke-pattern-',
      textureId,
    );
    let sampleSizeExpression = sizeExpression;
    let offsetExpression = 'vec2(0.)';
    if ('stroke-pattern-offset' in style && 'stroke-pattern-size' in style) {
      sampleSizeExpression = expressionToGlsl(
        fragContext,
        style[`stroke-pattern-size`],
        NumberArrayType,
      );
      offsetExpression = parseImageOffsetProperties(
        style,
        'stroke-pattern-',
        fragContext,
        sizeExpression,
        sampleSizeExpression,
      );
    }
    let spacingExpression = '0.';
    if ('stroke-pattern-spacing' in style) {
      spacingExpression = expressionToGlsl(
        fragContext,
        style['stroke-pattern-spacing'],
        NumberType,
      );
    }
    fragContext.functions['sampleStrokePattern'] =
      `vec4 sampleStrokePattern(sampler2D texture, vec2 textureSize, vec2 textureOffset, vec2 sampleSize, float spacingPx, float currentLengthPx, float currentRadiusRatio, float lineWidth) {
  float currentLengthScaled = currentLengthPx * sampleSize.y / lineWidth;
  float spacingScaled = spacingPx * sampleSize.y / lineWidth;
  float uCoordPx = mod(currentLengthScaled, (sampleSize.x + spacingScaled));
  // make sure that we're not sampling too close to the borders to avoid interpolation with outside pixels
  uCoordPx = clamp(uCoordPx, 0.5, sampleSize.x - 0.5);
  float vCoordPx = (-currentRadiusRatio * 0.5 + 0.5) * sampleSize.y;
  vec2 texCoord = (vec2(uCoordPx, vCoordPx) + textureOffset) / textureSize;
  return samplePremultiplied(texture, texCoord);
}`;
    const textureName = `u_texture${textureId}`;
    let tintExpression = '1.';
    if ('stroke-color' in style) {
      tintExpression = builder.getStrokeColorExpression();
    }
    builder.setStrokeColorExpression(
      `${tintExpression} * sampleStrokePattern(${textureName}, ${sizeExpression}, ${offsetExpression}, ${sampleSizeExpression}, ${spacingExpression}, currentLengthPx, currentRadiusRatio, v_width)`,
    );
  }

  if ('stroke-width' in style) {
    builder.setStrokeWidthExpression(
      expressionToGlsl(vertContext, style['stroke-width'], NumberType),
    );
  }

  if ('stroke-offset' in style) {
    builder.setStrokeOffsetExpression(
      expressionToGlsl(vertContext, style['stroke-offset'], NumberType),
    );
  }

  if ('stroke-line-cap' in style) {
    builder.setStrokeCapExpression(
      expressionToGlsl(vertContext, style['stroke-line-cap'], StringType),
    );
  }

  if ('stroke-line-join' in style) {
    builder.setStrokeJoinExpression(
      expressionToGlsl(vertContext, style['stroke-line-join'], StringType),
    );
  }

  if ('stroke-miter-limit' in style) {
    builder.setStrokeMiterLimitExpression(
      expressionToGlsl(vertContext, style['stroke-miter-limit'], NumberType),
    );
  }

  if ('stroke-line-dash' in style) {
    fragContext.functions['getSingleDashDistance'] =
      `float getSingleDashDistance(float distance, float radius, float dashOffset, float dashLength, float dashLengthTotal, float capType) {
  float localDistance = mod(distance, dashLengthTotal);
  float distanceSegment = abs(localDistance - dashOffset - dashLength * 0.5) - dashLength * 0.5;
  distanceSegment = min(distanceSegment, dashLengthTotal - localDistance);
  if (capType == ${stringToGlsl('square')}) {
    distanceSegment -= v_width * 0.5;
  } else if (capType == ${stringToGlsl('round')}) {
    distanceSegment = min(distanceSegment, sqrt(distanceSegment * distanceSegment + radius * radius) - v_width * 0.5);
  }
  return distanceSegment;
}`;

    let dashPattern = style['stroke-line-dash'].map((v) =>
      expressionToGlsl(fragContext, v, NumberType),
    );
    // if pattern has odd length, concatenate it with itself to be even
    if (dashPattern.length % 2 === 1) {
      dashPattern = [...dashPattern, ...dashPattern];
    }

    let offsetExpression = '0.';
    if ('stroke-line-dash-offset' in style) {
      offsetExpression = expressionToGlsl(
        vertContext,
        style['stroke-line-dash-offset'],
        NumberType,
      );
    }

    // define a function for this dash specifically
    const uniqueDashKey = computeHash(style['stroke-line-dash']);
    const dashFunctionName = `dashDistanceField_${uniqueDashKey}`;

    const dashLengthsDef = dashPattern.map(
      (v, i) => `float dashLength${i} = ${v};`,
    );
    const totalLengthDef = dashPattern
      .map((v, i) => `dashLength${i}`)
      .join(' + ');
    let currentDashOffset = '0.';
    let distanceExpression = `getSingleDashDistance(distance, radius, ${currentDashOffset}, dashLength0, totalDashLength, capType)`;
    for (let i = 2; i < dashPattern.length; i += 2) {
      currentDashOffset = `${currentDashOffset} + dashLength${
        i - 2
      } + dashLength${i - 1}`;
      distanceExpression = `min(${distanceExpression}, getSingleDashDistance(distance, radius, ${currentDashOffset}, dashLength${i}, totalDashLength, capType))`;
    }

    fragContext.functions[dashFunctionName] =
      `float ${dashFunctionName}(float distance, float radius, float capType) {
  ${dashLengthsDef.join('\n  ')}
  float totalDashLength = ${totalLengthDef};
  return ${distanceExpression};
}`;
    builder.setStrokeDistanceFieldExpression(
      `${dashFunctionName}(currentLengthPx + ${offsetExpression}, currentRadiusPx, capType)`,
    );
  }
}