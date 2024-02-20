function substituteFromContext(data, context) {
  let string = JSON.stringify(data);

  string = string.replace(/\$\{([^}]+)\}/g, (m, k) => readValueAtPath(k, context))

  return JSON.parse(string)
}