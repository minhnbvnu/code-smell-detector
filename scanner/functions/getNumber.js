function getNumber(value) {
  switch (typeof value) {
    case 'string':
      value = Number(value);
      return isNaN(value) ? null : value;

    case 'number':
      return value;

    default:
      return null;
  }
}