function applyNames(source, operations) {
  if (!operations.names) return source;
  const overridesByName = new Map(operations.names.map((n) => [n.column, n]));
  return source.map((d) =>
    Object.fromEntries(Object.keys(d).map((k) => {
      const override = overridesByName.get(k);
      return [override?.name ?? k, d[k]];
    }))
  );
}