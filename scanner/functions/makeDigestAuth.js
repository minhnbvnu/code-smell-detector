function makeDigestAuth(user, realm, pass) {
  console.log('PM: enabling HTTP authentication (Digest)');
  var digest = md5(fmt('%s:%s:%s', user, realm, pass));
  var digestAuth = auth.digest({realm: realm}, checkDigest);
  return auth.connect(digestAuth);

  function checkDigest(maybeUser, cb) {
    cb(maybeUser === user ? digest : null);
  }
}