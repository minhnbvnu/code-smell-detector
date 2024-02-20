function adjustIndex(changeRecord, array) {
  let index = changeRecord.index;
  const arrayLength = array.length;

  if (index > arrayLength) {
    index = arrayLength - changeRecord.addedCount;
  } else if (index < 0) {
    index = arrayLength + changeRecord.removed.length + index - changeRecord.addedCount;
  }

  if (index < 0) {
    index = 0;
  }

  changeRecord.index = index;
  return changeRecord;
}