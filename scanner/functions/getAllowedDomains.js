function getAllowedDomains() {
  const allowedDomains = environment.parseVariable(process.env.WHITELIST_DOMAINS) || [];

  return allowedDomains;
}