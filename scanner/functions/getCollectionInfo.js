function getCollectionInfo(url) {
  if (url.indexOf(API.collection.url) < 0) {
    throw new Error('Url not match!');
  }

  let cid = parseInt(url.match(/\d+/)[0]);
  let options = {
    url,
    headers: config.headers
  };
  return request(options).then(function (body) {
    let $ = cheerio.load(body[1]);
    let title = $('#zh-fav-head-title').text();
    let $user = $('#zh-single-answer-author-info .zm-list-content-title a');
    let user = {
      img: $('a.zm-list-avatar-link .zm-list-avatar-medium').attr('src'),
      name: $user.text(),
      url: $user.attr('href'),
    };
    return {
      cid,
      title,
      user
    };
  });
}