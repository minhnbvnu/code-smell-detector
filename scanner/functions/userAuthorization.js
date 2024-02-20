function userAuthorization(allowedUsers) {
  const allowedUsersSet = new Set(allowedUsers);

  return ({ email }) => {
    if (allowedUsersSet.size === 0) {
      return true;
    }

    if (email === undefined) {
      return false
    }

    return allowedUsersSet.has(email);
  };
}