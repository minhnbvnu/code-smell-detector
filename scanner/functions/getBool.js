function getBool(value) {
  switch (typeof value) {
    case 'boolean':
      return value;

    case 'string':
      return value.toLowerCase() !== 'false';

    case 'number':
      return Boolean(value);

    default:
      return null;
  }
}