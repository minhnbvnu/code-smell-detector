function pointPairs(arr) {
  const pairedValues = [];

  for (let i = 0; i < arr.length; i += 2) {
    pairedValues.push(`${arr[i]},${arr[i + 1]}`);
  }

  return pairedValues;
}