function evaluteExp(exp, ctx) {
  const match = /^\$\{(.+)\}$/.exec(exp);
  if (match) {
    if (match[1].endsWith('.Arn')) {
      return match[1].substring(0, match[1].length - '.Arn'.length);
    }
    return ctx[match[1]];

  }
  return exp;
}