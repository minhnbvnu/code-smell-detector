function randomIndex () {
  // Define weights for each index
  const weights = [5, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1]

  // Compute the total weight
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)

  // Generate a random number between 0 and the total weight
  const randomNumber = Math.floor(Math.random() * totalWeight)

  // Choose the index based on the random number and weights
  let weightSum = 0
  for (let i = 0; i < weights.length; i++) {
    weightSum += weights[i]
    if (randomNumber < weightSum) {
      return i
    }
  }
}