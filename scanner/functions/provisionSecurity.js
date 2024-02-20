function provisionSecurity(name) {
    return new Promise((resolve, reject) => {
      if (user.app_metadata.couchDB[name]) return resolve();

      request(
        {
          method: 'PUT',
          headers: { cookie },
          uri: `${databaseUri(name)}/_security`,
          json: true,
          body: {
            admins: { names: [], roles: [] },
            members: { names: [user.app_metadata.couchDB.username], roles: [] }
          }
        },
        (err, response, body) => {
          if (err) return reject(err);
          if (!body.ok) return reject('Could not set database security');

          user.app_metadata.couchDB[name] = databaseUri(name);
          resolve();
        }
      );
    });
  }