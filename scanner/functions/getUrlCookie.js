function getUrlCookie(link, callback) {
  chrome.cookies.getAll({ 'url': link }, function (cookies) {
    var format_cookies = [];
    for (var i in cookies) {
      var cookie = cookies[i];
      format_cookies.push(cookie.name + '=' + cookie.value);
    }
    format_cookies = format_cookies.join('; ');
    callback(format_cookies)
  });
}