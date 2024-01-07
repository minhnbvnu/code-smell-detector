function joinArrays(arrays, joiner) {
  const joinedArr = [];
  arrays.forEach((arr, i) => {
    if (i > 0 && arr.length > 0) {
      joinedArr.push(joiner);
    }
    joinedArr.push(...arr);
  });
  return joinedArr;
}