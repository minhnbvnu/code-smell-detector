function safeExec(command, options = {}) {
  let title = options.title || command;

  if (executionOptions.dryRun) {
    logWithPrefix(`[${title}]`.grey, 'DRY RUN'.magenta);
    return Promise.resolve();
  }

  return exec(command, options);
}