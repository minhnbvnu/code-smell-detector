function shouldBeAdminParty(session) {
  session.info.should.eql({
    "authentication_handlers": ["api"],
    "authentication_db": "test"
  });
  session.userCtx.should.eql({
    "name": null,
    "roles": ["_admin"]
  });
  session.ok.should.be.ok;
}