function __table(source, operations) {
  const errors = new Map();
  const input = source;
  const typed = applyTypes(source, operations);
  source = typed.source;
  let schema = typed.schema;
  if (operations.derive) {
    // Derived columns may depend on coerced values from the original data source,
    // so we must evaluate derivations after the initial inference and coercion
    // step.
    const derivedSource = [];
    operations.derive.map(({name, value}) => {
      let columnErrors = [];
      // Derived column formulas may reference renamed columns, so we must
      // compute derivations on the renamed source. However, we don't modify the
      // source itself with renamed names until after the other operations are
      // applied, because operations like filter and sort reference original
      // column names.
      // TODO Allow derived columns to reference other derived columns.
      applyNames(source, operations).map((row, index) => {
        let resolved;
        try {
          // TODO Support referencing `index` and `rows` in the derive function.
          resolved = value(row);
        } catch (error) {
          columnErrors.push({index, error});
          resolved = undefined;
        }
        if (derivedSource[index]) {
          derivedSource[index] = {...derivedSource[index], [name]: resolved};
        } else {
          derivedSource.push({[name]: resolved});
        }
      });
      if (columnErrors.length) errors.set(name, columnErrors);
    });
    // Since derived columns are untyped by default, we do a pass of type
    // inference and coercion after computing the derived values.
    const typedDerived = applyTypes(derivedSource, operations);
    // Merge derived source and schema with the source dataset.
    source = source.map((row, i) => ({...row, ...typedDerived.source[i]}));
    schema = [...schema, ...typedDerived.schema];
  }
  for (const {type, operands} of operations.filter) {
    const [{value: column}] = operands;
    const values = operands.slice(1).map(({value}) => value);
    switch (type) {
      // valid (matches the column type)
      case "v": {
        const [colType] = values;
        const isValid = getTypeValidator(colType);
        source = source.filter(d => isValid(d[column]));
        break;
      }
      // not valid (doesn't match the column type)
      case "nv": {
        const [colType] = values;
        const isValid = getTypeValidator(colType);
        source = source.filter(d => !isValid(d[column]));
        break;
      }
      case "eq": {
        const [value] = values;
        if (value instanceof Date) {
          const time = +value; // compare as primitive
          source = source.filter((d) => +d[column] === time);
        } else {
          source = source.filter((d) => d[column] === value);
        }
        break;
      }
      case "ne": {
        const [value] = values;
        source = source.filter((d) => d[column] !== value);
        break;
      }
      case "c": {
        const [value] = values;
        source = source.filter(
          (d) => typeof d[column] === "string" && d[column].includes(value)
        );
        break;
      }
      case "nc": {
        const [value] = values;
        source = source.filter(
          (d) => typeof d[column] === "string" && !d[column].includes(value)
        );
        break;
      }
      case "in": {
        const set = new Set(values); // TODO support dates?
        source = source.filter((d) => set.has(d[column]));
        break;
      }
      case "nin": {
        const set = new Set(values); // TODO support dates?
        source = source.filter((d) => !set.has(d[column]));
        break;
      }
      case "n": {
        source = source.filter((d) => d[column] == null);
        break;
      }
      case "nn": {
        source = source.filter((d) => d[column] != null);
        break;
      }
      case "lt": {
        const [value] = values;
        source = source.filter((d) => d[column] < value);
        break;
      }
      case "lte": {
        const [value] = values;
        source = source.filter((d) => d[column] <= value);
        break;
      }
      case "gt": {
        const [value] = values;
        source = source.filter((d) => d[column] > value);
        break;
      }
      case "gte": {
        const [value] = values;
        source = source.filter((d) => d[column] >= value);
        break;
      }
      default:
        throw new Error(`unknown filter type: ${type}`);
    }
  }
  for (const {column, direction} of reverse(operations.sort)) {
    const compare = direction === "desc" ? descendingDefined : ascendingDefined;
    if (source === input) source = source.slice(); // defensive copy
    source.sort((a, b) => compare(a[column], b[column]));
  }
  let {from, to} = operations.slice;
  from = from == null ? 0 : Math.max(0, from);
  to = to == null ? Infinity : Math.max(0, to);
  if (from > 0 || to < Infinity) {
    source = source.slice(Math.max(0, from), Math.max(0, to));
  }
  // Preserve the schema for all columns.
  let fullSchema = schema.slice();
  if (operations.select.columns) {
    if (schema) {
      const schemaByName = new Map(schema.map((s) => [s.name, s]));
      schema = operations.select.columns.map((c) => schemaByName.get(c));
    }
    source = source.map((d) =>
      Object.fromEntries(operations.select.columns.map((c) => [c, d[c]]))
    );
  }
  if (operations.names) {
    const overridesByName = new Map(operations.names.map((n) => [n.column, n]));
    if (schema) {
      schema = schema.map((s) => {
        const override = overridesByName.get(s.name);
        return ({...s, ...(override ? {name: override.name} : null)});
      });
    }
    if (fullSchema) {
      fullSchema = fullSchema.map((s) => {
        const override = overridesByName.get(s.name);
        return ({...s, ...(override ? {name: override.name} : null)});
      });
    }
    source = applyNames(source, operations);
  }
  if (source !== input) {
    if (schema) source.schema = schema;
  }
  source.fullSchema = fullSchema;
  source.errors = errors;
  return source;
}