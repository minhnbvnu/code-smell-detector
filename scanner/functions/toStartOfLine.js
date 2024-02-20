function toStartOfLine(stdout) {
  if (!supportsColor) {
    stdout.write('\r');
    return;
  }

  readline.cursorTo(stdout, 0);
}