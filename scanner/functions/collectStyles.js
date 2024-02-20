function collectStyles(strings, values) {
  const styles = [];
  let cssString = "";
  const behaviors = [];

  for (let i = 0, ii = strings.length - 1; i < ii; ++i) {
    cssString += strings[i];
    let value = values[i];

    if (value instanceof CSSDirective) {
      const behavior = value.createBehavior();
      value = value.createCSS();

      if (behavior) {
        behaviors.push(behavior);
      }
    }

    if (value instanceof ElementStyles || value instanceof CSSStyleSheet) {
      if (cssString.trim() !== "") {
        styles.push(cssString);
        cssString = "";
      }

      styles.push(value);
    } else {
      cssString += value;
    }
  }

  cssString += strings[strings.length - 1];

  if (cssString.trim() !== "") {
    styles.push(cssString);
  }

  return {
    styles,
    behaviors
  };
}