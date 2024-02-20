function presenterPopupToggle(page, event) {
  event.preventDefault();
  // remove class from both so we don't lose an active state if user clicks the wrong item
  $('#statslink').removeClass('enabled');
  $('#downloadslink').removeClass('enabled');

  var popup = $('#presenterPopup');
  if (popup.length > 0) {
    popup.slideUp(200, function () {
      popup.remove();
    });
  } else {
    $(event.target).addClass('enabled');
    popup = $('<div>');
    popup.attr('id', 'presenterPopup');
    $.get(page, function(data) {
      var link = $('<a>'),
          content = $('<div>');

      link.attr({
        href: page,
        target: '_new'
      });
      link.text(I18n.t('presenter.topbar.newpage'));

      content.attr('id', page.substring(1, page.length));
      content.append(link);
      /* use .siblings() because of how jquery formats $(data) */
      content.append($(data).siblings('#wrapper').html());
      popup.append(content);

      $('body').append(popup);
      popup.slideDown(200); // #presenterPopup is display: none by default
    });
  }
}