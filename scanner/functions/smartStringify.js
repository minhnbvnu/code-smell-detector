function smartStringify(value) {
  if (typeof value === 'number') {
    if (Number.isNaN(value)) {
      return 'NaN';
    } else if (!Number.isFinite(value)) {
      return 'Infinity';
    }
  } else if (value === undefined) {
    return 'undefined';
  }

  return JSON.stringify(value);
}