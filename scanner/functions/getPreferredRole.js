function getPreferredRole () {
  return jwtDecode(store.idToken)['cognito:preferred_role'] || ''
}