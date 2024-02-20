function makeBasicAuth(user, realm, pass) {
  console.log('PM: enabling HTTP authentication (Basic)');
  var basicAuth = auth.basic({realm: realm}, checkCredentials);
  return auth.connect(basicAuth);

  function checkCredentials(maybeUser, maybePassword, cb) {
    cb(maybeUser === user && maybePassword === pass);
  }
}