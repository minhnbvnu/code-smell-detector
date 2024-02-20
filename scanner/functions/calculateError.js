function calculateError() {
  // Start sum at 0
  var sum = 0;
  // For each sample
  for (var i = 0; i < training.length; i++) {
    // This is the guess based on the line
    var guess = m * training[i].x + b;
    // The error is the guess minus the actual temperature
    var error = guess - training[i].y;
    // Add up the error squared
    sum += error * error;
  }

  // Divide by total data points to average
  var avg = sum / training.length;
  return avg;
}