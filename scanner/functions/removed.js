function removed(err) {
    if (!t.error(err, 'removeUser should not have error')) {
      return t.end()
    }
    verify([
      'Datastore/operation/MongoDB/removeUser',
      'Callback: preRemove',
      'Datastore/operation/MongoDB/addUser',
      'Callback: added',
      'Datastore/operation/MongoDB/authenticate',
      'Callback: authed',
      'Datastore/operation/MongoDB/removeUser',
      'Callback: removed'
    ])
  }