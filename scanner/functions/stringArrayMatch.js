function stringArrayMatch(arr1, arr2) {
  let areArrays = Array.isArray(arr1) && Array.isArray(arr2);
  let match = areArrays && arr1.length === arr2.length;
  for (let i = 0; i < arr1.length; i++) {
    if (!match) {
      break;
    }
    match = isStringHasLength(arr1[i]) && arr1[i] === arr2[i];
  }
  return match;
}