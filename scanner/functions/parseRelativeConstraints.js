function parseRelativeConstraints(str, inlineSize) {
  const parts = str.split(",").map(str => str.trim());
  const constraintList = str.split(",").map(str =>
    str
      .trim()
      .split(" ")
      .map(str2 => str2.trim())
  );
  const relativeConstraints = {};

  for (let part of parts) {
    const [constraintStr, queryStr] = part.split("/").map(str => str.trim());
    const constraint = constraintStr.split(" ").map(str => str.trim());
    const query = queryStr ? queryStr.split(" ").map(str => str.trim()) : "";
    if (constraint.length === 3 || constraint.length === 2) {
      const [target, op, dest] = constraint;

      const operator = normalizeOperator(op);
      if (!operator) continue;

      if (query.length == 2) {
        const [queryType, queryLength] = query;
        if (queryType === "min-width" && inlineSize < parseInt(queryLength)) {
          continue;
        }

        if (queryType === "max-width" && inlineSize >= parseInt(queryLength)) {
          continue;
        }
      }

      if (!relativeConstraints[target]) relativeConstraints[target] = {};

      relativeConstraints[target][normalizeOperator(op)] = dest || true;
    }
  }

  return relativeConstraints;
}