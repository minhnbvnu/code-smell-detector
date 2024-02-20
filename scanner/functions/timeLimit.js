function timeLimit(count, limit, iteratee, callback) {
  mapLimit(baseRange(0, count, 1), limit, iteratee, callback);
}