function fetchLiveRate() {
    return new Promise(resolve => {
      const apiKey = context.secrets.apiKey;
      request(
        {
          method: 'GET',
          uri: `http://apilayer.net/api/live?access_key=${apiKey}`,
          json: true
        },
        (error, response, body) => {
          if (error || !body.success) {
            fetchCachedRate().then(rate => resolve(rate));
          } else {
            writeCachedRate(body).then(() => resolve(body));
          }
        }
      );
    });
  }