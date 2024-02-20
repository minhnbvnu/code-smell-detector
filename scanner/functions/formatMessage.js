function formatMessage(message) {
  return reverseChalk(chalk, message || '')
    .split(/\n/)
    .map(line => MESSAGE_INDENT + line)
    .join('\n')
}