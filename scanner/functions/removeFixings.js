function removeFixings({ prefix = "", postfix = "", value = "" } = {}) {
  const start = value.toLowerCase().startsWith(prefix.toLowerCase())
    ? prefix.length
    : 0;
  const end =
    value.length -
    (value.toLowerCase().endsWith(postfix.toLowerCase()) ? postfix.length : 0);

  let formatted = "";
  for (let i = start; i < end; i++) {
    formatted += value[i];
  }

  return formatted;
}