function printError(err) {
  return console.log(color(err.name + ": " + err.message, "red"));
}