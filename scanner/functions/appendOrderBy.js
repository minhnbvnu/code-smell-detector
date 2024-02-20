function appendOrderBy({column, direction}, args, escaper) {
  appendSql(`${escaper(column)} ${direction.toUpperCase()}`, args);
}