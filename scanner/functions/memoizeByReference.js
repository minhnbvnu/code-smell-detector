function memoizeByReference(cb) {
  let last = null;
  return args => {
    let result;

    if (last == null) {
      result = cb(args);
      last = {
        args,
        result
      };
      return result;
    } else if (last.args === args) {
      return last.result;
    } else {
      last.args = args;
      last.result = cb(args);
      return last.result;
    }
  };
}