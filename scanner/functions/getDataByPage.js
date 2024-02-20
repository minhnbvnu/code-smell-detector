function getDataByPage(url) {
  if (url.indexOf(API.collection.url) < 0) {
    throw new Error('Url not match!');
  }

  let options = {
    url,
    headers: config.headers
  };
  return request(options).then(function (body) {
    return getItems(body.body);
  });
}