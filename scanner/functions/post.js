function post(url) {
  var xhr = new window.XMLHttpRequest();
  xhr.open('POST', url);
  xhr.send(null);
}