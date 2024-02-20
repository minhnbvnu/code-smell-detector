function createDangerousStringForStyles(styles) {
  if (__DEV__) {
    let serialized = '';
    let delimiter = '';
    for (const styleName in styles) {
      if (!styles.hasOwnProperty(styleName)) {
        continue;
      }
      const styleValue = styles[styleName];
      if (styleValue != null) {
        const isCustomProperty = styleName.indexOf('--') === 0;
        serialized += delimiter + hyphenateStyleName(styleName) + ':';
        serialized += dangerousStyleValue(
          styleName,
          styleValue,
          isCustomProperty,
        );

        delimiter = ';';
      }
    }
    return serialized || null;
  }
}