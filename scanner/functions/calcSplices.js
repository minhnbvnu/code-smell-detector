function calcSplices(current, currentStart, currentEnd,
                        old, oldStart, oldEnd) {
    let prefixCount = 0;
    let suffixCount = 0;
    let splice;

    let minLength = Math.min(currentEnd - currentStart, oldEnd - oldStart);
    if (currentStart == 0 && oldStart == 0)
      prefixCount = sharedPrefix(current, old, minLength);

    if (currentEnd == current.length && oldEnd == old.length)
      suffixCount = sharedSuffix(current, old, minLength - prefixCount);

    currentStart += prefixCount;
    oldStart += prefixCount;
    currentEnd -= suffixCount;
    oldEnd -= suffixCount;

    if (currentEnd - currentStart == 0 && oldEnd - oldStart == 0)
      return [];

    if (currentStart == currentEnd) {
      splice = newSplice(currentStart, [], 0);
      while (oldStart < oldEnd)
        splice.removed.push(old[oldStart++]);

      return [ splice ];
    } else if (oldStart == oldEnd)
      return [ newSplice(currentStart, [], currentEnd - currentStart) ];

    let ops = spliceOperationsFromEditDistances(
        calcEditDistances(current, currentStart, currentEnd,
                               old, oldStart, oldEnd));

    splice = undefined;
    let splices = [];
    let index = currentStart;
    let oldIndex = oldStart;
    for (let i = 0; i < ops.length; i++) {
      switch(ops[i]) {
        case EDIT_LEAVE:
          if (splice) {
            splices.push(splice);
            splice = undefined;
          }

          index++;
          oldIndex++;
          break;
        case EDIT_UPDATE:
          if (!splice)
            splice = newSplice(index, [], 0);

          splice.addedCount++;
          index++;

          splice.removed.push(old[oldIndex]);
          oldIndex++;
          break;
        case EDIT_ADD:
          if (!splice)
            splice = newSplice(index, [], 0);

          splice.addedCount++;
          index++;
          break;
        case EDIT_DELETE:
          if (!splice)
            splice = newSplice(index, [], 0);

          splice.removed.push(old[oldIndex]);
          oldIndex++;
          break;
      }
    }

    if (splice) {
      splices.push(splice);
    }
    return splices;
  }