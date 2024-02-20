function pickOne() {
  // Start at 0
  var index = 0;

  // Pick a random number between 0 and 1
  var r = random(1);

  // Keep subtracting probabilities until you get less than zero
  // Higher probabilities will be more likely to be fixed since they will
  // subtract a larger number towards zero
  while (r > 0) {
    r -= population[index].fitness;
    // And move on to the next
    index += 1;
  }

  // Go back one
  index -= 1;

  return population[index];
}