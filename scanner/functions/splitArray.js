function splitArray(arr, predicate) {
  let lastArr = [];
  const multiArr = [lastArr];
  arr.forEach(item => {
    if (predicate(item)) {
      if (lastArr.length > 0) {
        lastArr = [];
        multiArr.push(lastArr);
      }
    } else {
      lastArr.push(item);
    }
  });
  return multiArr;
}