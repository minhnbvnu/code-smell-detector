function getAtomFeed(feedRoot) {
  var _a;
  var childs = feedRoot.children;
  var feed = {
    type: "atom",
    items: (0, legacy_1.getElementsByTagName)("entry", childs).map(function (item) {
      var _a;
      var children = item.children;
      var entry = {
        media: getMediaElements(children)
      };
      addConditionally(entry, "id", "id", children);
      addConditionally(entry, "title", "title", children);
      var href = (_a = getOneElement("link", children)) === null || _a === void 0 ? void 0 : _a.attribs.href;
      if (href) {
        entry.link = href;
      }
      var description = fetch("summary", children) || fetch("content", children);
      if (description) {
        entry.description = description;
      }
      var pubDate = fetch("updated", children);
      if (pubDate) {
        entry.pubDate = new Date(pubDate);
      }
      return entry;
    })
  };
  addConditionally(feed, "id", "id", childs);
  addConditionally(feed, "title", "title", childs);
  var href = (_a = getOneElement("link", childs)) === null || _a === void 0 ? void 0 : _a.attribs.href;
  if (href) {
    feed.link = href;
  }
  addConditionally(feed, "description", "subtitle", childs);
  var updated = fetch("updated", childs);
  if (updated) {
    feed.updated = new Date(updated);
  }
  addConditionally(feed, "author", "email", childs, true);
  return feed;
}