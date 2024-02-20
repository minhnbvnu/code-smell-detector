function isTestedIllustratorVersion(version) {
  var majorNum = parseInt(version);
  return majorNum >= 18 && majorNum <= 28; // Illustrator CC 2014 through 2024
}