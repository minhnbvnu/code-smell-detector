function quite(fn) {
  return (...args) => {
    try {
      if (fn) {
        fn.call(fn, ...args)
      }
    } catch (err) {
      // console.log(err);
    }
  }
}