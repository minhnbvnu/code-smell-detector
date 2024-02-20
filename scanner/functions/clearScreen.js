function clearScreen(numberOfTestFiles) {
  if (!require('./is-interactive')) {
    return
  }
  for (let i = 0; i < numberOfTestFiles; i += 1) {
    readline.moveCursor(process.stdout, 0, -1)
    readline.clearLine(process.stdout, 0)
  }
  for (let i = 0; i < 5; i += 1) {
    readline.moveCursor(process.stdout, 0, -1)
    readline.clearLine(process.stdout, 0)
  }
}