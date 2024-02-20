function handleColor(name, value) {
  const color = parseColor(value);
  if (color) {
    if (value[0] === '#' && value.length === 9) {
      const alpha = color.alpha().toFixed(2);
      return color.rgb().alpha(alpha).toString();
    }
    return value;
  }
  return '';
}