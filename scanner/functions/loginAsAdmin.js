function loginAsAdmin() {
    return new Promise((resolve, reject) => {
      request(
        {
          method: 'POST',
          uri: `${configuration['CouchHost']}/_session`,
          json: true,
          body: {
            name: configuration['CouchAdminUser'],
            password: configuration['CouchAdminPass']
          }
        },
        (err, response) => {
          if (err) return reject(err);

          cookie = response.headers['set-cookie'];
          resolve();
        }
      );
    });
  }