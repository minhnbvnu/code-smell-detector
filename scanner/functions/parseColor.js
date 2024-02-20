function parseColor(value) {
  try {
    return new Color(value);
  } catch (e) {}
  return null;
}