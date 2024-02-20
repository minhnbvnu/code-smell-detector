function added(err) {
    if (!t.error(err, 'addUser should not have error')) {
      return t.end()
    }

    if (typeof db.authenticate === 'function') {
      db.authenticate(userName, userPass, authed)
    } else {
      t.comment('Skipping authentication test, not supported on db')
      db.removeUser(userName, removedNoAuth)
    }
  }