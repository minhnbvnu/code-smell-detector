function titleCase(str) {
  return str.replace(/( |^)[a-z]/g, L => L.toUpperCase())
}