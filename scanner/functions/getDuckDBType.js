function getDuckDBType(type) {
  switch (type) {
    case "BIGINT":
    case "HUGEINT":
    case "UBIGINT":
      return "bigint";
    case "DOUBLE":
    case "REAL":
    case "FLOAT":
      return "number";
    case "INTEGER":
    case "SMALLINT":
    case "TINYINT":
    case "USMALLINT":
    case "UINTEGER":
    case "UTINYINT":
      return "integer";
    case "BOOLEAN":
      return "boolean";
    case "DATE":
    case "TIMESTAMP":
    case "TIMESTAMP WITH TIME ZONE":
      return "date";
    case "VARCHAR":
    case "UUID":
      return "string";
    // case "BLOB":
    // case "INTERVAL":
    // case "TIME":
    default:
      if (/^DECIMAL\(/.test(type)) return "integer";
      return "other";
  }
}