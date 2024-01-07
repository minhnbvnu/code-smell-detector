function send200(res, body) {
  sendResponse(res, 200, body || '<h1>OK</h1>');
}