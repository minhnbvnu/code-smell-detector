function formatNodeArgs(args, config) {
  const name = config.namespace;

  if (config.useColors) {
    const c = config.color;
    const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
    const prefix = `  ${colorCode};1m${name} \u001B[0m`;
    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
  } else {
    args[0] = name + ' ' + args[0];
  }
}