function makeAuthMiddleware(pmAuthStr) {
  var parts = parseAuth(pmAuthStr);
  return authMethods[parts.scheme](parts.user, parts.realm, parts.pass);
}