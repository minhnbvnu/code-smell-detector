function getRealUrl(apiUrl, postUrl) {
  let pathname = url.parse(postUrl).pathname;
  let paths = pathname.split('\/');
  if (paths.length < 0) {
    throw new Error('Url error!');
  }

  let data = {
    name: paths[1],
    postID: paths[2],
  };
  return _.template(apiUrl)(data);
}