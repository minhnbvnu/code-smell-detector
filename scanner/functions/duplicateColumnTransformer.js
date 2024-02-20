function duplicateColumnTransformer() {
    const observedColumns = new Set();
    return (col) => {
      let colName = col;
      let counter = 1;
      while (observedColumns.has(colName)) {
        colName = `${col}.${counter}`;
        counter++;
      }
      observedColumns.add(colName);
      return colName;
    };
  }