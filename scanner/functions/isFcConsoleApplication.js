function isFcConsoleApplication() {
  return process.env.FUN_CONSOLE_ENV
    && process.env.FUN_CONSOLE_ENV !== '0'
    && process.env.FUN_CONSOLE_ENV !== 'false';
}