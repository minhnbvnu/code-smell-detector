function send404(res, body) {
  sendResponse(res, 404, body || '<h1>Not Found</h1>');
}