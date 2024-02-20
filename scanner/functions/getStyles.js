function getStyles(stylesheet, propertyNames, feature) {
  const styles = {};

  for (const propertyName of propertyNames) {
    let value = stylesheet.getProperty(propertyName, feature);
    if (value === null) {
      value = stylesheet.getPropertyDefault(propertyName);
    }
    styles[propertyName] = value;
  }
  return styles;
}