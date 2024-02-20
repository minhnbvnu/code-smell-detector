function input_exists(input) {
  try {
    return fs.lstatSync(input);
  } catch (err) {
    return false;
  }
}