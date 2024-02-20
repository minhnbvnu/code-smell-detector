function getRemainingSessionTime (idToken) {
  return jwtDecode(idToken).exp * 1000 - Date.now()
}