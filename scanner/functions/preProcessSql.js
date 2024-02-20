function preProcessSql (sql) {
  const doubleQuotationRegex = new RegExp('\\"{1}', 'g')
  let result
  if (sql.indexOf('\\') > -1) {
    result = sql
  } else {
    result = sql.replace(doubleQuotationRegex, '\\"')
  }
  return result
}