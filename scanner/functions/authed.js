function authed(err) {
    if (!t.error(err, 'authenticate should not have error')) {
      return t.end()
    }
    db.removeUser(userName, removed)
  }