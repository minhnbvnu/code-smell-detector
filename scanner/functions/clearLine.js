function clearLine(stdout) {
  if (!supportsColor) {
    if (stdout instanceof (_tty || _load_tty()).default.WriteStream) {
      if (stdout.columns > 0) {
        stdout.write(`\r${' '.repeat(stdout.columns - 1)}`);
      }
      stdout.write(`\r`);
    }
    return;
  }

  readline.clearLine(stdout, CLEAR_WHOLE_LINE);
  readline.cursorTo(stdout, 0);
}