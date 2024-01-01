function checkIsImage (src, onResult) {
  var request;

  if (src.tagName) {
    onResult(src.tagName === 'IMG');
    return;
  }
  request = new XMLHttpRequest();

  // Try to send HEAD request to check if image first.
  request.open('HEAD', src);
  request.addEventListener('load', function (event) {
    var contentType;
    if (request.status >= 200 && request.status < 300) {
      contentType = request.getResponseHeader('Content-Type');
      if (contentType == null) {
        checkIsImageFallback(src, onResult);
      } else {
        if (contentType.startsWith('image')) {
          onResult(true);
        } else {
          onResult(false);
        }
      }
    } else {
      checkIsImageFallback(src, onResult);
    }
    request.abort();
  });
  request.send();
}