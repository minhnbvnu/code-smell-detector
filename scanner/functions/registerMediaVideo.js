function registerMediaVideo(accessToken, target, userName) {
  return new Promise((resolve, reject) => {
    const postParameter = {
      method: 'POST',
      uri: 'https://api.linkedin.com/v2/assets?action=registerUpload',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json',
      },
      body: {
        registerUploadRequest: {
          owner: `urn:li:${target}:${userName}`,
          recipes: ['urn:li:digitalmediaRecipe:feedshare-video'],
          serviceRelationships: [
            {
              identifier: 'urn:li:userGeneratedContent',
              relationshipType: 'OWNER',
            },
          ],
        },
      },
      json: true,
    };

    return requestPromise(postParameter)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}