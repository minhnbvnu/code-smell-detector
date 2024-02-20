function SignonMatchesFilter(aSignon, aFilterValue) {
  if (aSignon.origin.toLowerCase().includes(aFilterValue)) {
    return true;
  }
  if (
    aSignon.username &&
    aSignon.username.toLowerCase().includes(aFilterValue)
  ) {
    return true;
  }
  if (
    aSignon.httpRealm &&
    aSignon.httpRealm.toLowerCase().includes(aFilterValue)
  ) {
    return true;
  }
  if (
    showingPasswords &&
    aSignon.password &&
    aSignon.password.toLowerCase().includes(aFilterValue)
  ) {
    return true;
  }

  return false;
}