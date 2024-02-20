function assertValid (review) {
  assert.isString(review.id);
  assert(review.id);
  assert.isString(review.userName);
  assert(review.userName);
  assert.isString(review.title);
  assert.isString(review.text);
  assert.isNumber(review.score);
  assert(review.score > 0);
  assert(review.score <= 5);
  assertValidUrl(review.url);
  assert.isNotNull(new Date(review.updated).toJSON());
  assert.isString(review.updated);
  assert(review.updated);
}