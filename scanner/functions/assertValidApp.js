function assertValidApp (app) {
  assert.isString(app.appId);
  assert.isString(app.title);
  assert.isString(app.description);
  assertValidUrl(app.url);
  assertValidUrl(app.icon);

  if (app.score !== undefined) {
    // would fail for new apps without score
    assert.isNumber(app.score);
    assert(app.score >= 0);
    assert(app.score <= 5);
  }

  assert.isBoolean(app.free);

  return app;
}