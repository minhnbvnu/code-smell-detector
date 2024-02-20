function shouldBeAdmin(session) {
    session.info.authentication_handlers.should.contain("cookie");
    session.info.authentication_db.should.equal("_users");
    session.userCtx.should.eql({
      name: (HTTP_AUTH || {}).username || null,
      roles: ["_admin"]
    });
    session.ok.should.be.ok;
  }