function addBadges(tag, html) {
  var tags = $(".block:contains(" + tag + ")")

  // Remove identifier tags
  tags.each(function(index) {
    var oldHTML = $(this).html();
    var newHTML = oldHTML.replace(tag, "");
    $(this).html(newHTML);
  });

  // Add html badge tags
  tags.each(function(index) {
    if ($(this).parent().is('td.colLast')) {
      $(this).parent().prepend(html);
    } else if ($(this).parent('li.blockList')
                      .parent('ul.blockList')
                      .parent('div.description')
                      .parent().is('div.contentContainer')) {
      var contentContainer = $(this).parent('li.blockList')
                                    .parent('ul.blockList')
                                    .parent('div.description')
                                    .parent('div.contentContainer')
      var header = contentContainer.prev('div.header');
      if (header.length > 0) {
        header.prepend(html);
      } else {
        contentContainer.prepend(html);
      }
    } else if ($(this).parent().is('li.blockList')) {
      $(this).parent().prepend(html);
    } else {
      $(this).prepend(html);
    }
  });
}