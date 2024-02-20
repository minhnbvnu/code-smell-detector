function shouldBeLoggedIn(session, roles) {
  session.userCtx.should.eql({
    "name": "username",
    "roles": roles
  });
  session.info.authenticated.should.equal("api");
}