function bipBasicFail(req, res) {
  connect.basicAuth(function(username, password, cb){
    cb(false, false);
  })(req, res);
}