function makeRandomColumnValues(columns) {
  return columns.map(col => {
    switch (col.type) {
      case 'string':
        return Math.random()
          .toString(16)
          .slice(2);

      case 'float':
        return Math.random() * 100;

      case 'integer':
        return Math.round(Math.random() * 1e5);

      default:
        return null;
    }
  });
}