function findSimpleMatches(haystack, needleSet) {
  var match = haystack.every(function(val) {
    return val === null || needleSet.indexOf(val) >= 0;
  });
  // yes, this doesn't make much sense other than conforming 
  // to the output type of the other match functions
  return (match) ? [0] : []
}