function middlewareMatch(ctx, options) {
  if (!options.match && !options.ignore) {
    return true;
  }
  const match = pathMatching(options);
  return match(ctx);
}