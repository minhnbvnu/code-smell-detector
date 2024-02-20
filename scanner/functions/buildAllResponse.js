function buildAllResponse(resolver, handler, requestor) {
  if (resolver instanceof ResolverImpl && resolver.strategy === 4
  /* array */
  ) {
    const state = resolver.state;
    let i = state.length;
    const results = new Array(i);

    while (i--) {
      results[i] = state[i].resolve(handler, requestor);
    }

    return results;
  }

  return [resolver.resolve(handler, requestor)];
}