function getMeasurement(str, def = "0") {
  def = def || "0";

  if (!str) {
    return getMeasurement(def);
  }

  const match = str.trim().match(measurementPattern);

  if (!match) {
    return getMeasurement(def);
  }

  const [, valueStr, unit] = match;
  const value = parseFloat(valueStr);

  if (isNaN(value)) {
    return getMeasurement(def);
  }

  if (value === 0) {
    return 0;
  }

  const conv = dimConverters[unit];

  if (conv) {
    return conv(value);
  }

  return value;
}