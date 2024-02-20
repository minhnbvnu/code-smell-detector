function cleanList (results) {
  const reviews = ensureArray(results.feed.entry);
  return reviews.map((review) => ({
    id: review.id.label,
    userName: review.author.name.label,
    userUrl: review.author.uri.label,
    version: review['im:version'].label,
    score: parseInt(review['im:rating'].label),
    title: review.title.label,
    text: review.content.label,
    url: review.link.attributes.href,
    updated: review.updated.label
  }));
}