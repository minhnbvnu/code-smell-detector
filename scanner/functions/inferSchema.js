function inferSchema(source, columns = getAllKeys(source)) {
  const schema = [];
  const sampleSize = 100;
  const sample = source.slice(0, sampleSize);
  const typeCounts = {};
  for (const col of columns) {
    const colCount = typeCounts[col] = createTypeCount();
    for (const d of sample) {
      let value = d[col];
      if (value == null) continue;
      const type = typeof value;
      if (type !== "string") {
        ++colCount.defined;
        if (Array.isArray(value)) ++colCount.array;
        else if (value instanceof Date) ++colCount.date;
        else if (value instanceof ArrayBuffer) ++colCount.buffer;
        else if (type === "number") {
          ++colCount.number;
          if (Number.isInteger(value)) ++colCount.integer;
        }
        // bigint, boolean, or object
        else if (type in colCount) ++colCount[type];
      } else {
        value = value.trim();
        if (!value) continue;
        ++colCount.defined;
        ++colCount.string;
        if (/^(true|false)$/i.test(value)) {
          ++colCount.boolean;
        } else if (value && !isNaN(value)) {
          ++colCount.number;
          if (Number.isInteger(+value)) ++colCount.integer;
        } else if (DATE_TEST.test(value)) ++colCount.date;
      }
    }
    // Chose the non-string, non-other type with the greatest count that is also
    // ≥90%; or if no such type meets that criterion, fallback to string if
    // ≥90%; and lastly fallback to other.
    const minCount = Math.max(1, colCount.defined * 0.9);
    const type =
      greatest(types, (type) =>
        colCount[type] >= minCount ? colCount[type] : NaN
      ) ?? (colCount.string >= minCount ? "string" : "other");
    schema.push({
      name: col,
      type: type,
      inferred: type
    });
  }
  return schema;
}