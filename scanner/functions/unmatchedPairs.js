function unmatchedPairs(regex) {
  function check(sql) {
    return regex.test(sql) ? '?' : sql
  }
  check.regex = regex

  return check
}