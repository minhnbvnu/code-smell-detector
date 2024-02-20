function extractCwdArg(args) {
  for (let i = 0, I = args.length; i < I; ++i) {
    const arg = args[i];
    if (arg === '--') {
      return null;
    } else if (arg === '--cwd') {
      return args[i + 1];
    }
  }
  return null;
}