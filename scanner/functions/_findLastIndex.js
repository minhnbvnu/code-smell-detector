function _findLastIndex(arr, pred, ctx) {
  for (let i = arr.length - 1; i >= 0; --i) {
    if (pred.call(ctx, arr[i], i, arr)) {
      return i
    }
  }
  return -1
}