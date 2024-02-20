function statMode(outputPath) {
  return masked(fs.lstatSync(outputPath).mode);
}