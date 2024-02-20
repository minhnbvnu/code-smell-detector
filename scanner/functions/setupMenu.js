function setupMenu() {
  var nav = $("<ul>"),
      currentSection = '',
      sectionUL = '';

  slides.each(function(s, slide){
    var slidePath = $(slide).attr('data-section');
    var headers = $(slide).children("h1, h2");
    var slideTitle = '';
    var content;

    if (currentSection !== slidePath) {
      currentSection = slidePath;
      var newSection  = $("<li>");
      var icon        = $('<i>')
        .addClass('fa fa-angle-down');
      var sectionLink = $("<a>")
        .addClass('navSection')
        .attr('href', '#')
        .text(slidePath)
        .append(icon)
        .click(function() {
          $(this).next().toggle();
          updateMenuChevrons();

          if( $(this).parent().is(':last-child') ) {
            $(this).next().children('li').first()[0].scrollIntoView();
          }

          return false;
        });
      sectionUL = $("<ul>");
      newSection.append(sectionLink, sectionUL);
      nav.append(newSection);
    }

    // look for first header to use as a title
    if (headers.length > 0) {
      slideTitle = headers.first().text();

    } else {
      // if no header, look at the first non-empty line of content
      content    = $(slide).find(".content");
      slideTitle = content.text().split("\n").filter(Boolean)[0] || ''; // split() gives us an empty array when there's no content.

      // just in case we've got any extra whitespace around.
      slideTitle = slideTitle.trim();

      // if no content (like photo only) fall back to slide name
      if (slideTitle == "") {
        slideTitle = content.attr('ref').split('/').pop();
      }
    }

    var navLink = $("<a>")
      .addClass('navItem')
      .attr('rel', s)
      .attr('href', '#')
      .text((s + 1) + ". " + slideTitle)
      .click(function() {
          gotoSlide(s);
          if (typeof slaveWindow !== 'undefined' && slaveWindow !== null) {
              slaveWindow.gotoSlide(s, false);
              postSlide();
              update();
          }
          return false;
      });
    var navItem = $("<li>").append(navLink);

    sectionUL.append(navItem);
  });

  // can't use .children.replaceWith() because this starts out empty...
  $("#navigation").empty();
  $("#navigation").append(nav);
}