function randomValueFromArray(array) {
  const randomNo = Math.floor(Math.random() * array.length);
  return array[randomNo];
}