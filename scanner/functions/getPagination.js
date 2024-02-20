function getPagination(url) {
  let options = {
    url,
    headers: config.headers
  };
  return request(options).then(function (body) {
    let $ = cheerio.load(body.body);
    let pages = $('.zm-invite-pager span').eq(-2).text();
    let currentPage = $('.zm-invite-pager span.zg-gray-normal').eq(-1).text();
    return {
      pages: parseInt(pages),
      current: parseInt(currentPage),
    };
  });
}