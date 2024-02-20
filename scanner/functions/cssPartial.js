function cssPartial(strings, ...values) {
  const {
    styles,
    behaviors
  } = collectStyles(strings, values);
  return new CSSPartial(styles, behaviors);
}