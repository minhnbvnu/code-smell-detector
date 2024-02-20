function warnDeprecation(reporter, deprecationWarning) {
  const command = 'yarn team';
  reporter.warn(reporter.lang('deprecatedCommand', `${command} ${deprecationWarning.deprecatedCommand}`, `${command} ${deprecationWarning.currentCommand}`));
}