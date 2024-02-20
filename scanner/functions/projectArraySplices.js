function projectArraySplices(array, changeRecords) {
  let splices = [];
  const initialSplices = createInitialSplices(changeRecords);

  for (let i = 0, ii = initialSplices.length; i < ii; ++i) {
    const splice = initialSplices[i];

    if (splice.addedCount === 1 && splice.removed.length === 1) {
      if (splice.removed[0] !== array[splice.index]) {
        splices.push(splice);
      }

      continue;
    }

    splices = splices.concat(calcSplices(array, splice.index, splice.index + splice.addedCount, splice.removed, 0, splice.removed.length));
  }

  return splices;
}