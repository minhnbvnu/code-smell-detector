function moveSelected(arr, isSelected, offset) {
  const newArr = new Array(arr.length);
  let next = 0;

  for (let i = 0; i < newArr.length; i++) {
    const from = i - offset; // Is a value supposed to move here?

    if (from >= 0 && from < arr.length && isSelected(from)) {
      newArr[i] = arr[from];
    } else {
      while (next < arr.length && isSelected(next)) {
        next++;
      }

      newArr[i] = arr[next];
      next++;
    }
  }

  return newArr;
}