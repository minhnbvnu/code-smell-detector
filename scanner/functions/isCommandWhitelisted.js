function isCommandWhitelisted(command) {
  return WHITELISTED_PREFIXES.some(prefix => command.startsWith(prefix));
}