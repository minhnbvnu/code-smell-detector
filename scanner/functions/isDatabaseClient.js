function isDatabaseClient(value, mode) {
  return (
    value &&
    (typeof value.sql === "function" ||
      (typeof value.queryTag === "function" &&
        (typeof value.query === "function" ||
          typeof value.queryStream === "function"))) &&
    (mode !== "table" || typeof value.describeColumns === "function") &&
    value !== __query // don’t match our internal helper
  );
}