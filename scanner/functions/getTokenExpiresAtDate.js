function getTokenExpiresAtDate(expiresIn) {
  return new Date(Date.now() + (expiresIn * 1000));
}