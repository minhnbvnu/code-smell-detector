function new_resize(container) {
  return function() {
    var dimensions = {
      h: process.stdout.rows,
      w: process.stderr.columns
    };

    if (dimensions.h !== 0 && dimensions.w !== 0) {
      container.resize(dimensions);
    }
  };
}