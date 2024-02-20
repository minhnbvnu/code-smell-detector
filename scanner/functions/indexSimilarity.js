function indexSimilarity(subA, subB, counter) {
  if (!subA || !subB) throw new Error('Subreddits key is malformed ' + subredditPairKey);

  // Regular Jaccard similarity:
  var similarity = counter.count/(commentersCount.get(subA) + commentersCount.get(subB) - counter.count);

  // Similarity is bi-directional. We store both ends of the edge into file:
  var aSims = indexedSimilarity.get(subA);
  if (!aSims) {
    aSims = [];
    indexedSimilarity.set(subA, aSims);
  }
  aSims.push({
    sub: subB,
    score: similarity
  });

  var bSims = indexedSimilarity.get(subB);
  if (!bSims) {
    bSims = [];
    indexedSimilarity.set(subB, bSims);
  }

  bSims.push({
    sub: subA,
    score: similarity
  });
}