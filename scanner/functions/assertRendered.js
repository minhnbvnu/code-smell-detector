function assertRendered(text) {
  assert.equal(
    getRenderedContent(),
    text
  );
}