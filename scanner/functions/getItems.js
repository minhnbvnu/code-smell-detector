function getItems(body) {
  let $ = cheerio.load(body);
  let allZMItem = $('.zm-item');
  let items = [];
  allZMItem.each(function (index, element) {
    let h2 = $(element).find('h2.zm-item-title a');
    let href = h2.attr('href') || '';
    let content = $(element).find('div.zm-item-fav div');
    let user = content.find('.answer-head .zm-item-answer-author-wrap');
    let answerID = parseInt($(element).find('.zm-item-fav .zm-item-answer ').attr('data-aid'));
    let atoken = parseInt($(element).find('.zm-item-fav .zm-item-answer ').attr('data-atoken'));
    let html = $(element).find('textarea.content').html();
    let item = {
      aid: answerID,
      voter: parseInt($(element).find('.zm-item-vote a.zm-item-vote-count').text()),
      desc: content.find('div.zh-summary.summary').text(),
      content: html,
      atoken: atoken,
      question: {
        id: parseInt(href.match(/\d*?$/)[0]),
        title: h2.text(),
        url: config.zhihu + h2.attr('href'),
      },
      user: {
        username: user.find('a').text(),
        userTitle: user.find('strong').text(),
        url: user.find('a').attr('href'),
      },
    };
    items.push(item);
  });

  return items;
}