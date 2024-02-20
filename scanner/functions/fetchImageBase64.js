function fetchImageBase64(url) {
  return new Promise(function(resolve) {
    // convert url to github raw
    url = url.replace('github.com', 'raw.githubusercontent.com');
    url = url.replace('/blob/', '/');
    request.get(url, function(err, res, body) {
      resolve('data:image/png;base64,' + body.toString('base64'));
    });
  });
}