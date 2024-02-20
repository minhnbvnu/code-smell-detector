function quickSort(arrayToSort, low, high) {
  const index = partition(arrayToSort, low, high);

  if (low < index - 1) {
    quickSort(arrayToSort, low, index - 1);
  }
  if (index < high) {
    quickSort(arrayToSort, index, high);
  }
}