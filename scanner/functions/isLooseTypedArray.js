function isLooseTypedArray(arr) {
  return names[toString.call(arr)]
}