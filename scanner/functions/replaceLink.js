function replaceLink(wm, link) {
    var lnkTxt = link;
    if (/^www\./i.test(link)) {
      link = link.replace(/^www\./i, 'http://www.');
    }
    return '<a href="' + link + '">' + lnkTxt + '</a>';
  }