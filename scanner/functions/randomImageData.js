function randomImageData(n) {
  var array = new Uint8ClampedArray(n),
      i

  for(i = 0; i < n; i++) {
    array[i] = Math.random() * 128
  }
  return array
}