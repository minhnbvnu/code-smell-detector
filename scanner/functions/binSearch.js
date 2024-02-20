function binSearch(location, items, compare) {
  let count = items.length;
  let index = 0;
  let firstElementIndex = 0;
  let step;

  while (count > 0) {
    index = firstElementIndex;
    step = Math.floor(count / 2);
    index += step;
    const comparison = compare(location, items, index);

    if (comparison.direction === 0) {
      if (comparison.index == null) {
        throw new Error('Expected an index when matching element is found.');
      }

      firstElementIndex = comparison.index;
      break;
    }

    if (comparison.direction > 0) {
      index++;
      firstElementIndex = index;
      count -= step + 1;
    } else {
      count = step;
    }
  }

  return firstElementIndex != null ? items[firstElementIndex] : null;
}