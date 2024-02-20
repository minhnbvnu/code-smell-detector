function isStrictModeOverride(args, method) {
  return args.length >= 2 && STYLE_DIRECTIVE_REGEX.test(args[0]) && args[1] === `color: ${getConsoleColor(method) || ''}`;
}