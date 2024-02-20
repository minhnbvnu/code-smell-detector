function stringContains (str0, str1) {
  if (!str0 || !str1) return false
  return str0.toString().indexOf(str1) > -1
}