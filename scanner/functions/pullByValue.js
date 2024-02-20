function pullByValue(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      shift(arr, i);
      return value;
    }
  }

  return undefined;
}