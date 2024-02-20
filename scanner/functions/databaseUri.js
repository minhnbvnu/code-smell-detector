function databaseUri(name) {
    return `${configuration['CouchHost']}/${name}_${
      user.app_metadata.couchDB.username
    }`;
  }