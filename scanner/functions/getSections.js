function getSections($, root, relative) {
  var items = [];

  var sections = root.children("section[data-type], div[data-type='part']");

  sections.each(function(index, el) {
    var jel = $(el);
    var header = jel.find("> header");

    // create section item
    var item = {
      id: jel.attr("id"),
      type: jel.attr("data-type")
    };

    // find title of section
    var title = header.length
      ? header.find("> h1, > h2, > h3, > h4, > h5")
      : jel.find("> h1, > h2, > h3, > h4, > h5");
    if (title.length) {
      item.label = title.first().text();
    }

    // find level of section
    var level;
    if (item.type in levels) {
      level = levels[item.type];
    } else {
      return;
    }

    // find href of section
    item.relative = relative;

    if (level <= maxLevel) {
      item.children = getSections($, jel, relative);
    }

    items.push(item);
  });

  return items;
}