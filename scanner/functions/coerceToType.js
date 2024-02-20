function coerceToType(value, type) {
  switch (type) {
    case "string":
      return typeof value === "string" || value == null ? value : String(value);
    case "boolean":
      if (typeof value === "string") {
        const trimValue = value.trim().toLowerCase();
        return trimValue === "true"
          ? true
          : trimValue === "false"
          ? false
          : null;
      }
      return typeof value === "boolean" || value == null
        ? value
        : Boolean(value);
    case "bigint":
      return typeof value === "bigint" || value == null
        ? value
        : Number.isInteger(typeof value === "string" && !value.trim() ? NaN : +value)
        ? BigInt(value) // eslint-disable-line no-undef
        : undefined;
    case "integer": // not a target type for coercion, but can be inferred
    case "number": {
      return typeof value === "number"
        ? value
        : value == null || (typeof value === "string" && !value.trim())
        ? NaN
        : Number(value);
    }
    case "date": {
      if (value instanceof Date || value == null) return value;
      if (typeof value === "number") return new Date(value);
      const trimValue = String(value).trim();
      if (typeof value === "string" && !trimValue) return null;
      return new Date(DATE_TEST.test(trimValue) ? trimValue : NaN);
    }
    case "array":
    case "object":
    case "buffer":
    case "other":
      return value;
    default:
      throw new Error(`Unable to coerce to type: ${type}`);
  }
}