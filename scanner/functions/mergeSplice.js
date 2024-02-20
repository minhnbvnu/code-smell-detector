function mergeSplice(splices, index, removed, addedCount) {
  const splice = newSplice(index, removed, addedCount);
  let inserted = false;
  let insertionOffset = 0;

  for (let i = 0; i < splices.length; i++) {
    const current = splices[i];
    current.index += insertionOffset;

    if (inserted) {
      continue;
    }

    const intersectCount = intersect(splice.index, splice.index + splice.removed.length, current.index, current.index + current.addedCount);

    if (intersectCount >= 0) {
      // Merge the two splices
      splices.splice(i, 1);
      i--;
      insertionOffset -= current.addedCount - current.removed.length;
      splice.addedCount += current.addedCount - intersectCount;
      const deleteCount = splice.removed.length + current.removed.length - intersectCount;

      if (!splice.addedCount && !deleteCount) {
        // merged splice is a noop. discard.
        inserted = true;
      } else {
        let currentRemoved = current.removed;

        if (splice.index < current.index) {
          // some prefix of splice.removed is prepended to current.removed.
          const prepend = splice.removed.slice(0, current.index - splice.index);
          $push.apply(prepend, currentRemoved);
          currentRemoved = prepend;
        }

        if (splice.index + splice.removed.length > current.index + current.addedCount) {
          // some suffix of splice.removed is appended to current.removed.
          const append = splice.removed.slice(current.index + current.addedCount - splice.index);
          $push.apply(currentRemoved, append);
        }

        splice.removed = currentRemoved;

        if (current.index < splice.index) {
          splice.index = current.index;
        }
      }
    } else if (splice.index < current.index) {
      // Insert splice here.
      inserted = true;
      splices.splice(i, 0, splice);
      i++;
      const offset = splice.addedCount - splice.removed.length;
      current.index += offset;
      insertionOffset += offset;
    }
  }

  if (!inserted) {
    splices.push(splice);
  }
}