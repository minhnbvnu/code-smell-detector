async function evaluateQuery(source, args, invalidation) {
  if (!source) throw new Error("missing data source");

  // If this DatabaseClient supports abort and streaming, use that.
  if (typeof source.queryTag === "function") {
    const abortController = new AbortController();
    const options = {signal: abortController.signal};
    invalidation.then(() => abortController.abort("invalidated"));
    if (typeof source.queryStream === "function") {
      return accumulateQuery(
        source.queryStream(...source.queryTag.apply(source, args), options)
      );
    }
    if (typeof source.query === "function") {
      return source.query(...source.queryTag.apply(source, args), options);
    }
  }

  // Otherwise, fallback to the basic sql tagged template literal.
  if (typeof source.sql === "function") {
    return source.sql.apply(source, args);
  }

  // TODO: test if source is a file attachment, and support CSV etc.
  throw new Error("source does not implement query, queryStream, or sql");
}