function getFloat({
  data,
  defaultValue,
  validate
}) {
  if (!data) {
    return defaultValue;
  }

  data = data.trim();
  const n = parseFloat(data);

  if (!isNaN(n) && validate(n)) {
    return n;
  }

  return defaultValue;
}