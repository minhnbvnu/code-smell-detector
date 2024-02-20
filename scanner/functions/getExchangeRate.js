function getExchangeRate() {
    return new Promise((resolve, reject) => {
      let data = '';
      const key = process.env.API_KEY;
      if (!key) {
        return reject('API key is missing!');
      }

      const req = http.get(
        `http://apilayer.net/api/live?access_key=${key}`,
        function(res) {
          res.on('data', chunk => {
            data += chunk;
          });
          res.on('end', () => {
            const rate = JSON.parse(data);
            resolve(convertRate(rate));
          });
        }
      );

      req.on('error', e => {
        reject(e);
      });
    });
  }