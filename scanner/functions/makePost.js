function makePost(endpoint, params) {
    return new Promise((resolve, reject) => {
      twitterClient.post(endpoint, params, (error, data, response) => {
        if (error) {
          // logger.info(` Error on Make Post : ${error}`);
          // logger.info(` Response on Make Post : ${JSON.stringify(response)}`);
          reject(error);
        } else {
          // Sending response
          resolve(data);
        }
      });
    });
  }