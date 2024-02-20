function getAllowedUsers() {
  const allowedUsers = environment.parseVariable(process.env.WHITELIST_USERS) || [];

  return allowedUsers;
}