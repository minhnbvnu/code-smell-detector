function getInteger({
  data,
  defaultValue,
  validate
}) {
  if (!data) {
    return defaultValue;
  }

  data = data.trim();
  const n = parseInt(data, 10);

  if (!isNaN(n) && validate(n)) {
    return n;
  }

  return defaultValue;
}