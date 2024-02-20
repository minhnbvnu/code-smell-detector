function parseFeed(feed, options) {
  if (options === void 0) {
    options = {
      xmlMode: true
    };
  }
  var handler = new FeedHandler(options);
  new Parser_1.Parser(handler, options).end(feed);
  return handler.feed;
}