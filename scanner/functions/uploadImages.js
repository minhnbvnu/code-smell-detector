function uploadImages(url, accessToken, imagePath) {
  try {
    const basePath = path.resolve(__dirname, '../../..');
    const filePath = `${basePath}/media/${imagePath}`;
    const extenstion = require('path').extname(filePath).substr(1);

    return new Promise((resolve, reject) => {
      const formData = {
        file: {
          value: require('fs').createReadStream(filePath),
          options: {
            filename: filePath,
            contentType: `images/${extenstion}`,
          },
        },
      };

      const postParameter = {
        method: 'POST',
        uri: url,
        // host: `api.linkedin.com`,
        headers: {
          // 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
          Authorization: `Bearer ${accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0',
          'Content-Type': `images/${extenstion}`,
          Accept: '*/*',
          'Content-Type': 'application/octet-stream',
        },
        formData: {
          image: fs.createReadStream(filePath),
        },
        resolveWithFullResponse: true,
      };

      return requestPromise(postParameter)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  } catch (error) {
    logger.info(error);
  }
}