function rightadd(info, tab) {
  var down = { filename: '' };
  down.finalUrl = info.linkUrl;
  down.referrer = info.pageUrl;
  if (!getStorage('path')) {
    alert('Camtd has not been configured');
    chrome.tabs.create({ 'url': 'options.html' }, function (s) { });
    return 0;
  }
  getUrlCookie(down.finalUrl, (cookies) => {
    var aria2_obj = combination(down, cookies);
    var ifpostback = postaria2obj(aria2_obj);
    if (ifpostback == 'base64_error') {
      notice('Error adding tasks to aria2!', 'Error')
    } else {
      // notice('Aria2 is starting to download files.', down.filename)
      sendAnimMsg()
    }
  })
}