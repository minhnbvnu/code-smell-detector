function euclidean(person1, person2) {
  // Ratings of person 1 and 2
  var ratings1 = ratings[person1];
  var ratings2 = ratings[person2];

  // Need to add up all the differences
  var sum = 0;

  // All the movies rated by person 1
  var movies = Object.keys(ratings1);
  // For every movie
  for (var i = 0; i < movies.length; i++) {
    var movie = movies[i];
    // As long as both rated the movie
    if (ratings2[movie] !== undefined) {
      var rating1 = ratings1[movie];
      var rating2 = ratings2[movie];
      // Difference between the ratings
      var diff = rating1 - rating2;
      // Square it
      sum += diff * diff;
    }
  }

  // This maps the distance to 0 and 1
  // Higher score is more similar
  return 1 / (1 + sqrt(sum));
}