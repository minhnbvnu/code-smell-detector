function toNumberArray(arr) {
  if (!Array.isArray(arr)) {
    return null;
  }

  const length = arr.length;

  for (let i = 0; i < length; i++) {
    if (typeof arr[i] !== "number") {
      const result = new Array(length);

      for (let j = 0; j < length; j++) {
        result[j] = +arr[j];
      }

      return result;
    }
  }

  return arr;
}