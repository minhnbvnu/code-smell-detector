function appendPostData (entry, request) {
  if (!request.body) return;

  entry.request.postData = {
    mimeType: 'application/octet-stream',
    text: request.body
  };
}