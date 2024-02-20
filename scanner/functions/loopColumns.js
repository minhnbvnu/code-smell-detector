function loopColumns({
  columns,
  childrenField = 'children'
}, callback) {
  if (!columns) {
    throw new Error('loopColumns - Missing columns!');
  }

  columns.forEach((column, index) => {
    callback && callback(column, index);

    if (column.children && column.children.length) {
      loopColumns({ columns: column.children, childrenField }, callback);
    }
  });
}