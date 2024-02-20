function nestedTryCatch() {
  try {
    normalPath();
  } catch (e) {
    try {
      // try
      alternatePath();
    // just a little bit harder
    } catch (e) {
      // catch
      console.log(e);
    // if you can
    } finally {}
  } finally {
    shouldBreak = true;
  }
  next();
}