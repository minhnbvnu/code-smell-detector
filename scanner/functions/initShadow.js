function initShadow(module, options) {
  if (!options?.shadow) return null;
  return new Map(
    Object.entries(options.shadow)
      .map(([name, definition]) => [name, (new Variable(TYPE_IMPLICIT, module)).define([], definition)])
  );
}