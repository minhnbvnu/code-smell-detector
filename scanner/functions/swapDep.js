function swapDep(arr, a, b) {
  const indexA = arr.findIndex(item => item.name === a);
  const indexB = arr.findIndex(item => item.name === b);
  if (indexA === -1 || indexB === -1 || indexA < indexB) return false;
  arr.splice(indexB, 0, arr.splice(indexA, 1)[0]);
  return true;
}