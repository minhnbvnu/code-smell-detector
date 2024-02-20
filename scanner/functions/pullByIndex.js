function pullByIndex(arr, index) {
  if (index < arr.length) {
    const value = arr[index];
    shift(arr, index);
    return value;
  }

  return undefined;
}