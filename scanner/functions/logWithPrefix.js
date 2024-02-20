function logWithPrefix(prefix, message) {
  console.log(
    message.toString().trim()
    .split('\n')
    .map((line) => `${prefix.grey} ${line}`)
    .join('\n')
  );
}