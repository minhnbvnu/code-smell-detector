function addCheckMark(callback) {
  process.stdout.write(chalk.green(' ✓'));
  if (callback) callback();
}