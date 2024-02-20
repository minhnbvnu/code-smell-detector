function mockResponseFound(req, res) {
  const requestUrl = new URL(req.url);
  const jqueryUrl = requestUrl.searchParams.get("callback");
  const wholeString = jqueryUrl + '(' + JSON.stringify(MOCKED_RESPONSE_FOUND) + ')';
  res.setBody(wholeString);
}