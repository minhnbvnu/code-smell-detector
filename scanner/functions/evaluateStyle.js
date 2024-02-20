function evaluateStyle(userStyle, props) {
  if (!userStyle) {
    return null;
  }
  if (typeof userStyle === 'function') {
    return userStyle(props);
  }
  return userStyle;
}