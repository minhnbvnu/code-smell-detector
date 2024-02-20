function openNav(id) {
    $('#' + id).width(TOC_NAV_WIDTH);
    toggle.find('span.showToc').first().addClass('hide');
    toggle.find('span.hideToc').first().removeClass('hide');
    toggle.removeClass('closed');
    toggle.addClass('opened');
  }