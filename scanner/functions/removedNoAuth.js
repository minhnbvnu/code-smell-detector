function removedNoAuth(err) {
    if (!t.error(err, 'removeUser should not have error')) {
      return t.end()
    }
    verify([
      'Datastore/operation/MongoDB/removeUser',
      'Callback: preRemove',
      'Datastore/operation/MongoDB/addUser',
      'Callback: added',
      'Datastore/operation/MongoDB/removeUser',
      'Callback: removedNoAuth'
    ])
  }