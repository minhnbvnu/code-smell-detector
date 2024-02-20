function appendSql(sql, args) {
  const strings = args[0];
  strings[strings.length - 1] += sql;
}