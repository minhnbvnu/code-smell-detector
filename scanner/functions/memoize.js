function memoize(compute) {
  let cachedArgs = null;
  let cachedResult = null;

  return (...args) => {
    const needsRecompute =
      !cachedArgs ||
      args.length !== cachedArgs.length ||
      args.some((a, i) => !isEqual(a, cachedArgs[i]));

    if (needsRecompute) {
      cachedResult = compute(...args);
      cachedArgs = args;
    }
    return cachedResult;
  };
}