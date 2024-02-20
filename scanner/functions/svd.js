function svd(X) {
  var sigma = numeric.div(numeric.dot(numeric.transpose(X), X), X.length)
  return numeric.svd(sigma)
}