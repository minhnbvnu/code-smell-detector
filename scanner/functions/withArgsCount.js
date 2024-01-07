function withArgsCount(minArgs, maxArgs) {
  return function (encoded, context) {
    const operation = encoded[0];
    const argCount = encoded.length - 1;
    if (minArgs === maxArgs) {
      if (argCount !== minArgs) {
        const plural = minArgs === 1 ? '' : 's';
        throw new Error(
          `Expected ${minArgs} argument${plural} for ${operation}, got ${argCount}`,
        );
      }
    } else if (argCount < minArgs || argCount > maxArgs) {
      const range =
        maxArgs === Infinity
          ? `${minArgs} or more`
          : `${minArgs} to ${maxArgs}`;
      throw new Error(
        `Expected ${range} arguments for ${operation}, got ${argCount}`,
      );
    }
  };
}