function parseNumericValue(type, min, max, value) {
  let result = value;

  if (value[0] === '+') {
    result = value.slice(1);
  }

  result = strictParseInt(result);

  if (min !== undefined && value < min) {
    throw new Error(
      type + ': invalid value "' + value + '" must be > ' + min
    );
  }

  if (max !== undefined && value > max) {
    throw new Error(
      type + ': invalid value "' + value + '" must be < ' + min
    );
  }

  return result;
}