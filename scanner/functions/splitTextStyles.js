function splitTextStyles(style) {
  const {
    color,
    fontSize,
    fontStyle,
    fontWeight,
    fontFamily,
    fontVariant,
    letterSpacing,
    lineHeight,
    includeFontPadding,
    textAlign,
    textAlignVertical,
    textDecorationLine,
    textDecorationColor,
    textDecorationStyle,
    textShadowColor,
    textShadowRadius,
    textShadowOffset,
    textTransform,
    writingDirection,
    ...otherStyles
  } = StyleSheet.flatten([style]);

  const textStyles = {
    color,
    fontSize,
    fontStyle,
    fontWeight,
    fontFamily,
    fontVariant,
    letterSpacing,
    lineHeight,
    includeFontPadding,
    textAlign,
    textAlignVertical,
    textDecorationLine,
    textDecorationColor,
    textDecorationStyle,
    textShadowColor,
    textShadowRadius,
    textShadowOffset,
    textTransform,
    writingDirection
  };

  return {
    textStyles,
    otherStyles
  };
}