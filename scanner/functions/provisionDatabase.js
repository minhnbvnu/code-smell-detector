function provisionDatabase(name) {
    return new Promise((resolve, reject) => {
      if (user.app_metadata.couchDB[name]) return resolve();

      request(
        {
          method: 'PUT',
          headers: { cookie },
          uri: databaseUri(name),
          json: true
        },
        (err, response, body) => {
          if (err) return reject(err);
          if (!body.ok) return reject('Could not create database');

          resolve();
        }
      );
    });
  }