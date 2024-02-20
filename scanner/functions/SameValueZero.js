function SameValueZero(a, b) {
    return (_.isNaN(a) && _.isNaN(b)) || a === b;
  }