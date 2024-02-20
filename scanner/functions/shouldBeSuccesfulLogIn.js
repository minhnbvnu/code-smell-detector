function shouldBeSuccesfulLogIn(data, roles) {
  var copy = extend({}, data);
  // irrelevant
  delete copy.sessionID;
  copy.should.eql({
    "ok": true,
    "name": "username",
    "roles": roles
  });
}