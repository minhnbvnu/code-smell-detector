function loadComplete(content, xhr) {
  // Force a full page load if it's not a compatible content type or a
  // non-2xx status code
  var contentType = xhr.getResponseHeader('Content-Type').split(';')[0];
  var shouldDoFullLoad =
    ALLOWED_CONTENT_TYPES.indexOf(contentType) === -1 ||
    xhr.status < 200 ||
    xhr.status > 299;
  if (shouldDoFullLoad) {
    window.location.reload();
    return;
  }

  var body = getTagContent(content, 'body');
  var title = getTagContent(content, 'title');
  document.title = title;
  render(body);
  document.body.classList.remove('react-loading');
}