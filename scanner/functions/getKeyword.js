function getKeyword({
  data,
  defaultValue,
  validate
}) {
  if (!data) {
    return defaultValue;
  }

  data = data.trim();

  if (validate(data)) {
    return data;
  }

  return defaultValue;
}