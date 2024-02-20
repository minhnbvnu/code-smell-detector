function isRegistered () {
  if (!store.idToken) {
    return false
  }

  const role = getPreferredRole()
  return (
    role.includes('-CognitoAdminRole-') ||
    role.includes('-CognitoRegisteredRole-')
  )
}