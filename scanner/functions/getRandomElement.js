function getRandomElement (array) {
  const rnd = Math.random()
  return array[Math.floor(rnd * array.length)]
}