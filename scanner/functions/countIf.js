function countIf(arr, f) {
  var result = 0
  for (var i = 0; i < arr.length; i++) if (f[arr[i]]) result++
  return result
}