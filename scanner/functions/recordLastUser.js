function recordLastUser(subs) {
  if (!subs) return;
  if (subs.length < 2) return;
  var total = 0;
  for (var i = 0; i < subs.length; ++i) {
    total += subs[i].count;
  }

  for (var i = 0; i < subs.length - 1; ++i) {
    var subA = subs[i];
    for (var j = i + 1; j < subs.length; ++j) {
      var subB = subs[j];

      var processThisPair = false;

      // we index only those subreddits that match our indexing rule
      if (shouldBeIndexed(subA.sub)) {
        writeOutputFor.add(subA.sub);
        processThisPair = true;
      }

      if (shouldBeIndexed(subB.sub)) {
        writeOutputFor.add(subB.sub);
        processThisPair = true;
      }

      if (!processThisPair) {
        // If this pair can be skipped - we skip it. Assuming subsequent runs
        // will cover it (e.g. we index only subreddits that starts with letter
        // "a", on the subequent program run we will index subreddits that
        // start with letter "b", and so on).
        continue;
      }

      var pair = makeKey(subA.sub, subB.sub);
      let parentItem = parents.get(pair.parent);
      if (!parentItem) {
        parentItem = new Map();
        parents.set(pair.parent, parentItem);
      }

      let scores = parentItem.get(pair.child);

      if (!scores) {
        scores = new Counter();
        parentItem.set(pair.child, scores);
      }

      var na = subA.count/total;
      var nb = subB.count/total;

      scores.increase((na + nb)/2);
    }
  }
}