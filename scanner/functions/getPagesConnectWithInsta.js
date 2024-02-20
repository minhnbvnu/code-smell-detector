function getPagesConnectWithInsta(accessToken) {
  let url = `https://graph.facebook.com/${fbversion}/me/accounts?fields=id,connected_instagram_account,access_token&access_token=${accessToken}`;
  return new Promise((resolve, reject) => {
    return request.get(url, (error, response, body) => {
      if (error) {
        logger.error(`Error while getting getPagesConnectWithInsta  ${error}`);
        reject(error);
      } else {
        let parsedBody = JSON.parse(body);
        resolve(parsedBody);
      }
    });
  });
}