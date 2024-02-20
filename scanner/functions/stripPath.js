function stripPath(message) {
  return message.replace(/'?((\/|\\|[a-z]:\\)[^\s']+)+'?/ig, '<path>');
}