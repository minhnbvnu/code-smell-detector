function provisionUser() {
    return new Promise((resolve, reject) => {
      if (user.app_metadata.couchDB.username) return resolve();

      const name = uuidv4();
      const password = uuidv4();
      request(
        {
          method: 'PUT',
          headers: { cookie },
          uri: `${configuration['CouchHost']}/_users/org.couchdb.user:${name}`,
          json: true,
          body: { name, password, roles: [], type: 'user' }
        },
        (err, response, body) => {
          if (err) return reject(err);
          if (!body.ok) return reject('Could not create user');

          user.app_metadata.couchDB.username = name;
          user.app_metadata.couchDB.password = password;
          resolve();
        }
      );
    });
  }