function selectedFields (array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].selected === false) {
      array.splice(i, 1)
      i = i - 1
    }
  }
  return array
}