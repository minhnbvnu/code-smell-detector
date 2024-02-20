function getAllPageData(url) {
  let formatUrl = util.parse(url);
  let realUrl = config.zhihu + formatUrl.pathname;
  let allItems = [];
  return getPagination(url).then(function (paginations) {
    let pages = [];
    for (let i = 1; i <= paginations.pages; i++) {
      pages.push(i);
    }

    //并发
    return Promise.map(pages, function (page) {
      let pageUrl = realUrl + '?page=' + page;
      return getDataByPage(pageUrl).then(function (items) {
        allItems = allItems.concat(items);
      });
    }, {concurrency: 5}).then(function (total) {
      return total;
    });
  }).then(function () {
    return allItems;
  });
}