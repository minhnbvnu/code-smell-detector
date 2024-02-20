function validateToken(auth) {
  try {
    return auth.tokenExpireDate() > Date.now();
  } catch (e) {
    console.log(`Error checking valid: ${e}`);
    return false;
  }
}