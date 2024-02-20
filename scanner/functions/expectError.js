function expectError(cb) {
  try {
    cb();
    throw new Error("no error was raised");
  } catch(e) {
    return e;
  }
}