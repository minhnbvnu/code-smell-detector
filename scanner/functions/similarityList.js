function similarityList(person, similarity) {
  // Here is everyone
  var people = Object.keys(ratings);
  // An array to store all similarity scores
  var scores = [];
  for (var i = 0; i < people.length; i++) {
    var other = people[i];
    // Don't compare yourself
    if (other != person) {
      // Get the score
      var sim = similarity(person, other);
      // Add to array
      scores.push({
        name: other,
        score: sim
      });
    }
  }
  // Sort by score
  scores.sort(byScore);

  function byScore(a, b) {
    return b.score - a.score;
  }
  // Send it back
  return scores;
}