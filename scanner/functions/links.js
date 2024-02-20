function links (text, sanitize) {
    // link conversion happens in four phases:
    //   unexpected markers are adulterated
    //   links are found, converted, and stashed away properly escaped
    //   remaining text is processed and escaped
    //   unique markers are replaced with unstashed links
    var stashed = []
    function stash (text) {
      var here = stashed.length
      stashed.push(text)
      return "〖" + here + "〗"
    }
    function unstash (match, digits) {
      return stashed[+digits]
    }
    function internal (title) {
      if (names && names.indexOf(title)!=-1) {
        return stash(`<a href=?${title}>${title}</a>`)
      } else {
        return title
      }
    }
    function external (url) {
      if (url.match(/\.(gif|jpg|jpeg|png)$/)) {
        return stash("<img src=\"" + url.replace(/^https:\/wiki\//,'https://c2.com/wiki/') + "\">")
      } else {
        return stash("<a href=\"" + url + "\" rel=\"nofollow\" target=\"_blank\">" + url + "</a>")
      }
    }
    function youtube (match, p1, p2) {
      var embed =
        "<object width=\"425\" height=\"344\">" +
        "<param name=\"movie\" value=\"https://www.youtube.com/v/$2&hl=en&fs=1&\"></param>" +
        "<param name=\"allowFullScreen\" value=\"true\"></param>" +
        "<param name=\"allowscriptaccess\" value=\"always\"></param>" +
        "<embed src=\"https://www.youtube.com/v/" + p2 + "&hl=en&fs=1&\" type=\"application/x-shockwave-flash\" allowscriptaccess=\"always\" allowfullscreen=\"true\" width=\"425\" height=\"344\"></embed>" +
        "</object>"
      return stash(embed)
    }
    function isbn (match, isbn) {
      var code = isbn.replace(/[- ]/g, "")
      if (code.match(/^\d{9}.$/)) {
        return "ISBN " + isbn
      } else {
        return "ISBN " + isbn
      }
    }
    function titlesearch () {
      return stash(options.titlesearch())
    }
    function fullsearch () {
      return stash(options.fullsearch())
    }
    var prepass = text
      .replace(/〖(\d+)〗/g, '〖 $1 〗')
      .replace(/^https:\/\/(www.)?youtube.com\/watch\?v=([-\w]+)/, youtube)
      .replace(/\[Search\]/, titlesearch)
      .replace(/\[Fullsearch\]/, fullsearch)
      .replace(/\[?ISBN:? *([0-9- xX]{10,})\]?/i, isbn)
      .replace(/\b(https?|ftp|mailto|file|telnet|news):[^\s<>\[\]"'\(\)]*[^\s<>\[\]"'\(\)\,\.\?]/g,external)
      .replace(/\b[A-Z][a-z]+([A-Z][a-z]+)+\b/g, internal)
    var postpass = sanitize(prepass)
      .replace(/〖(\d+)〗/g, unstash)
    if (code == '') {
      postpass = complete(postpass)
    }
    return postpass
  }